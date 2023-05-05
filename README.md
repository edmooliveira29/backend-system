## Backend Repository Installation

This guide describes how to install and run the backend repository, which uses MongoDB v6.0.5, as well as how to set up access to GitHub with two-factor authentication (2FA).

### Prerequisites

- A linux-based operating system, such as Ubuntu.
- Git installed on your machine.
- A GitHub account with 2FA enabled.

### Using NVM

To install NVM, open the terminal and run the following command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

To install a version of Node.js using NVM, run the following command:

```sh
nvm install v18.16.0
```

To set the default Node.js version to be used, run the following command:

```sh
nvm alias default v18.16.0
```

For example, to set Node.js v16.0.0 as the default, run:

```sh
nvm alias default 16.0.0
```


## Installing MongoDB 6.0.2

This guide will walk you through the installation process for MongoDB 6.0.2.

### Step 1: Import the MongoDB GPG Key

Run the following command to import the MongoDB GPG Key:

```sh
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

### Step 2: Create a list file for MongoDB

For Ubuntu 20.04 (Focal) users, run the following command to create a list file:

```sh
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

For Ubuntu 18.04 (Bionic) users, run the following command instead:

```sh
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

### Step 3: Reload the local package database

Run the following command to reload the local package database:

```sh
sudo apt-get update
```

### Step 4: Install MongoDB

Run the following command to install MongoDB 6.0.2:

```sh
sudo apt-get install -y mongodb-org
```

### Step 5: Start MongoDB

Run the following command to start MongoDB:

```sh
sudo systemctl start mongod
```

### Step 6: Verify that MongoDB is running

Run the following command to verify that MongoDB is running:

```sh
sudo systemctl status mongod
```

You should see the status "active (running)" if MongoDB is running correctly.

### Setting Up 2FA Access to GitHub

GitHub offers various forms of authentication, and we recommend using a personal access token (PAT) that can be created on the security settings page of your GitHub account.

To create a PAT, follow the steps below:

1. Go to the security settings page of your GitHub account (https://github.com/settings/security).

2. Click "Personal access tokens".

3. Click "Generate new token".

4. Enter a description for the token (e.g. "Repository access to GitHub").

5. Select the permissions the token should have (e.g. read and write access to private repositories).

6. Click "Generate token".

7. Copy the generated token to a safe location. You will only see the token once, so be sure to copy it immediately.

### Cloning the Repository

To clone the repository, open the terminal and run the following command:

```sh
git clone https://{YOUR ACCESS KEY}@github.com/edmooliveira29/backend-system.git
```

### Installing Dependencies

To install the project dependencies, run the following command in the project root directory:

```sh
npm install
```

### Running the Repository

To run the repository, run the following command in the project root directory:

```sh
npm start
```

### Running the Tests

To run the tests, run the following command in the project root directory:

```sh
npm run test:unit
```

### Author
Edmo de Oliveira Leite (edmooliveira29@gmail.com)