# **Backend Repository Installation**
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/edmooliveira29/ed0ba52b68a607aefdcb0993e5559316/raw/jest-coverage-comment__main.json)
### **Pre-requisites**

- A linux-based operating system, such as Ubuntu.
- Git installed on your machine.
- A GitHub account with 2FA enabled.

### **Using NVM**

To install NVM, open the terminal and run the following command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```


Execute the following command:
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```


To install a version of Node.js using NVM, run the following command:

```sh
nvm install v18.16.0
```


To set the default Node.js version to be used, run the following command:

```sh
nvm alias default v18.16.0
```

### **Install mongoDB using version 6.0.2**
Create a README to install MongoDB Community Edition on Ubuntu using the apt package manager:

1. Import the public key used by the package management system. If gnupg is not already installed, install it using the following command:

```
sudo apt-get install gnupg
```

Then import the MongoDB public GPG Key using the following command:

```
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
```

2. Create a list file for MongoDB based on your version of Ubuntu. Open a terminal or shell on the host and execute `lsb_release -dc` to determine the version of Ubuntu that is running. Then create the list file for your version of Ubuntu:

For Ubuntu 22.04 (Jammy):
```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

For Ubuntu 20.04 (Focal):
```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

For Ubuntu 18.04 (Bionic):
```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

For Ubuntu 16.04 (Xenial):
```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

3. Reload the local package database using the following command:

```
sudo apt-get update
```

4. Install MongoDB Community Edition using the following command:

To install the latest stable version:
```
sudo apt-get install -y mongodb-org
```

To install a specific release of MongoDB:
```
sudo apt-get install -y mongodb-org=<version-number>
```

5. Start the mongod process using the following command:
```
sudo systemctl start mongod
```

If you receive an error stating that mongod.service was not found, run the following command first:
```
sudo systemctl daemon-reload
```

6. Verify that MongoDB has started successfully using the following command:
```
sudo systemctl status mongod
```

This README is based on the official MongoDB documentation: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/


### **Setting Up 2FA Access to GitHub**

GitHub offers various forms of authentication, and we recommend using a personal access token (PAT) that can be created on the security settings page of your GitHub account.

To create a PAT, follow the steps below:

1. Go to the security settings page of your GitHub account (https://github.com/settings/security).

2. Click "Personal access tokens".

3. Click "Generate new token".

4. Enter a description for the token (e.g. "Repository access to GitHub").

5. Select the permissions the token should have (e.g. read and write access to private repositories).

6. Click "Generate token".

7. Copy the generated token to a safe location. You will only see the token once, so be sure to copy it immediately.

### **Cloning the Repository**

To clone the repository, open the terminal and run the following command:

```sh
git clone https://{YOUR ACCESS KEY}@github.com/edmooliveira29/backend-system.git
```

### **Installing Dependencies**

To install the project dependencies, run the following command in the project root directory:

```sh
npm install
```

### **Running the Repository**

To run the repository, run the following command in the project root directory:

```sh
npm start
```

### **Running the Tests**

To run the tests, run the following command in the project root directory:

```sh
npm run test:unit
```

### **Author**
Edmo de Oliveira Leite (edmooliveira29@gmail.com)