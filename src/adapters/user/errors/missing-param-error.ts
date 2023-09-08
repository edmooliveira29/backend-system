export class MissingParamError extends Error {
  constructor (paramName: string) {
    super('Parâmentro ausente: ' + paramName + '.')
    this.name = 'MissingParamError'
  }
}
