#!/bin/bash

cd "$(dirname "$0")"
LAST_TAG=$(git describe --tags --abbrev=0)
LAST_COMMITS=$(git log --tags "$LAST_TAG"..HEAD --pretty=format:"%s")
echo "Last tag: $LAST_TAG"
VERSION_NUMBER="${LAST_TAG#v}"
echo "Version number: $VERSION_NUMBER"
IFS='.'
read -r part1 part2 part3 <<< "$VERSION_NUMBER"

# Exibir os resultados
echo "Parte 1: $part1"
echo "Parte 2: $part2"
echo "Parte 3: $part3"
PATH_COUNT=$part1
MAJOR=$part2
MINOR=$part3
RELEASE_NOTES=""

STOP_LOOP=false
STOP_LOOP_AUX=true
while IFS= read -r line; do
  case $line in
    fix:*)
      STOP_LOOP=true
      if [ "$STOP_LOOP" = true ] && [ "$STOP_LOOP_AUX" = true ]; then
        RELEASE_NOTES+="**Fixes**"$'\n'
        MINOR=$((MINOR + 1))
        STOP_LOOP_AUX=false
      fi
      RELEASE_NOTES+="- ${line:5}"$'\n'
      ;;
    feat:*)
      STOP_LOOP=true
      if [ "$STOP_LOOP" = true ] && [ "$STOP_LOOP_AUX" = true ]; then
        MINOR=0
        RELEASE_NOTES+="**Features**"$'\n'
        MAJOR=$((MAJOR + 1))
        STOP_LOOP_AUX=false
      fi
      RELEASE_NOTES+="-${line:5}"$'\n'
      ;;
    path:*)
      STOP_LOOP=true
      if [ "$STOP_LOOP" = true ] && [ "$STOP_LOOP_AUX" = true ]; then
        MINOR=0
        MAJOR=0
        RELEASE_NOTES+="**New version**"$'\n'
        PATH_COUNT=$((PATH_COUNT + 1))
        STOP_LOOP_AUX=false
      fi
      RELEASE_NOTES+="- ${line:5}"$'\n'
      ;;
  esac
done <<< "$LAST_COMMITS"

LAST_PATH=$(git log -1 --pretty=format:"%s" --grep="path:")

VERSION="v$PATH_COUNT.$MAJOR.$MINOR"

mkdir -p .git
git config credential.helper "store --file=.git/credentials"
echo "https://github.com:${GH_TOKEN}@github.com" > .git/credentials

git tag -af "$VERSION" -m "Versão $VERSION"
git push origin "$VERSION" --tags -o ci.skip
gh release create "$VERSION" --title "$VERSION" --notes "$RELEASE_NOTES"
