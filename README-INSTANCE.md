# **Configure VM instance in Google Cloud Platform**
**COST WARNING:** Please be aware that using Google Cloud Platform (GCP) services may incur charges. It is important to monitor your usage and associated costs to avoid unexpected charges. You can set up billing alerts and budgets in the GCP console to help you keep track of your usage and costs. Additionally, you can review the GCP pricing documentation and use the pricing calculator to estimate your costs before using any services. Please be responsible when using GCP services to avoid any unwanted expenses.

### **Gcloud VM instalation**

To install the Google Cloud SDK on Linux/Ubuntu, follow these steps:

**Before you begin** 
Before you install the gcloud CLI, make sure that your operating system meets the following requirements:

An Ubuntu release that hasn't reached end-of-life or a Debian stable release that hasn't reached end-of-life
apt-transport-https is installed:

```
sudo apt-get install apt-transport-https ca-certificates gnupg
```

1. Add the gcloud CLI distribution URI as a package source. If your distribution supports the signed-by option, run the following command:
```
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

If your distribution doesn't support the signed-by option, run the following command:

```
echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

2. Import the Google Cloud public key. If your distribution's apt-key command supports the --keyring argument, run the following command:
```

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
```
If your distribution's apt-key command doesn't support the --keyring argument, run the following command:

```
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```

If your distribution (Debian 11+ or Ubuntu 21.10+) doesn't support apt-key, run the following command:
```
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo tee /usr/share/keyrings/cloud.google.gpg
```

3. Update and install the gcloud CLI:
```
sudo apt-get update && sudo apt-get install google-cloud-cli
```
This configuration is based on the official gcloud CLI documentation: https://cloud.google.com/sdk/docs/install#deb

### **Open instace by ssh**
1. Open your operating system's terminal and run the `gcloud auth login` command to log in to your GCP account.

2. Then run the command `gcloud compute ssh` followed by your instance name and user:

```
gcloud compute ssh system
```

3. Press Enter and wait for the SSH connection to be established.

4. Once connected, you will be able to run commands on the instance through the terminal.

Keep in mind that to access the instance via SSH using `gcloud`, you need to have the Google Cloud Platform SDK installed and configured on your local machine.

### **Nginx configuration**

To configure NGINX in project, follow the steps below inside vm instance.

1. Install NGINX:

   ```
   sudo apt-get update
   sudo apt-get install nginx
   ```

2. Open the NGINX configuration file for editing:

   ```
   sudo nano /etc/nginx/sites-available/default
   ```

3. Add the following block of code inside the "server" block:

   ```                                                                                              
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
   ```

   This configuration block will redirect requests made to the URL "http://{you_ip}:5000/" to your Node.js server running on port 5000.

4. Save and close the file.

5. Restart NGINX:

   ```
   sudo systemctl restart nginx
   ```

   This configuration is based on the official NGINX documentation: https://www.nginx.com/resources/wiki/start/topics/tutorials/install/
   
### **Create Certificate SSL to API**
To issue an SSL certificate for a specific IP, you can follow these steps:

1. Ensure that the IP address of your server is pointing to the correct domain name. This can be done by adding an *A* record in your domain provider's DNS withe the IP address of the server VM.

2. Install Certbot on your server. Certbot is an automated tool for issuing free SSL certificates from Let's Encrypt.
To install Certbot on your server, you can follow these steps:

   2.1. Update your system's package manager:

   ```
   sudo apt-get update
   ```

   2.2. Install Certbot's package:

   ```
   sudo apt-get install certbot
   ```

   2.3. Run the following command to generate a new certificate:

   ```
   sudo certbot certonly --cert-name subdominio.dominio --standalone -d api.edmopuc.online --agree-tos --email email@email.com
   ```

   2.4. Certbot will ask you to confirm whether you want to allow it to modify firewall settings to allow HTTPS traffic. Select the option that corresponds to your needs.

   2.5. Wait for Certbot to obtain and install the new SSL certificate.

   2.6. Check that the Nginx configuration file for your site is pointing to the correct path for the SSL certificate and key file.

   ```
   server {
    listen 80;
    server_name subdominio.dominio;
    return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name subdominio.dominio;
       ssl on;
       ssl_certificate /etc/letsencrypt/live/subdominio.dominio/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/subdominio.dominio/privkey.pem;

       location / {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
      }
   ```

   2.7. Restart the Nginx service to load the new configuration.

   ```
   sudo systemctl restart nginx
   ```

   With these steps, you should have a new SSL certificate configured on your server and Nginx should be configured to use it correctly.

   ### **Create User with password to mongodb**
   1. Run the following command

   ```
   mongosh
   ```

   2. Switch to system-database with the follow command

   ```
   use system-database
   ```

   3. Create a new user with the password and username that be in file .env

   ```
   db.createUser({
     user: "system-user-database",
     pwd: "M@nag3r$%Syst3m",
     roles: [{ role: "dbOwner", db: "system-batabase" }]
   })
```

