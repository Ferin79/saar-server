# 🛡️ Securely Hosting a NestJS App on EC2 with HTTPS Using `nip.io`

## ✅ Overview

This guide walks through deploying a NestJS app on an EC2 instance and securing it using HTTPS **without a custom domain**, using the free wildcard DNS service **[nip.io](https://nip.io)**.

## 🔧 Requirements

- EC2 instance running Amazon Linux 2023
- Node.js/NestJS app running on port `8080`
- EC2 security group open to ports **80 (HTTP)** and **443 (HTTPS)**
- SSH access to the EC2 instance

---

## 🧭 Step 1: Pointing a nip.io Domain to Your EC2

### 🎯 What is nip.io?

`nip.io` is a wildcard DNS service that maps subdomains directly to IPs. It lets you get a temporary, DNS-resolvable domain like:

```
app.54-165-91-101.nip.io → 54.165.91.101
```

You don't need to configure DNS — this just works!

> **Why it matters:** Let's Encrypt requires a real domain name to issue SSL certs — `nip.io` gives you a valid domain **for free**.

---

## 🧱 Step 2: Install and Configure Nginx

### 🔍 Why Nginx?

Nginx acts as a **reverse proxy**. It sits in front of your NestJS app, listens on ports 80/443, and forwards requests to your internal port `8080`.

### 📦 Install Nginx:

```bash
sudo dnf install nginx -y
```

### 📁 Create a Reverse Proxy Config

```bash
sudo nano /etc/nginx/conf.d/nestjs.conf
```

Paste this:

```nginx
server {
    listen 80;
    server_name app.54-165-91-101.nip.io;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### ⚙️ Apply the Config:

```bash
sudo nginx -t       # Test configuration
sudo systemctl reload nginx  # Apply changes
```

> At this point, your app should be available at `http://app.54-165-91-101.nip.io`

---

## 🔐 Step 3: Secure the App with HTTPS (Let's Encrypt)

### ❓ Why Certbot?

**Certbot** is the official client to request free SSL certificates from [Let’s Encrypt](https://letsencrypt.org/).

### ⚠️ Problem: Amazon Linux 2023 does NOT support `snapd` (the standard way to install Certbot)

### ✅ Solution: Use EPEL packages instead

```bash
sudo dnf install -y epel-release
sudo dnf install -y certbot python3-certbot-nginx
```

This installs `certbot` and the Nginx plugin, which will automatically modify your Nginx config to add HTTPS.

---

## 📄 Step 4: Request the SSL Certificate

Run the following command:

```bash
sudo certbot --nginx -d app.54-165-91-101.nip.io
```

### 🔍 What happens behind the scenes:

1. **Certbot contacts Let's Encrypt**.
2. It uses a temporary file on your EC2 at `/.well-known/acme-challenge/` to prove domain ownership.
3. Let's Encrypt verifies the DNS (`app.54-165-91-101.nip.io` → your EC2 IP).
4. If successful, Certbot:
   - Obtains a signed SSL certificate
   - Configures Nginx to serve HTTPS
   - Reloads Nginx automatically

After that, your app is available at:

```
https://app.54-165-91-101.nip.io
```

---

## 🔁 Step 5: Auto-Renew the SSL Certificate

### ⚠️ Problem: Amazon Linux 2023 doesn’t come with `cron`

### ✅ Solution: Install and enable it

```bash
sudo dnf install cronie -y
sudo systemctl enable crond
sudo systemctl start crond
```

### 📅 Add renewal cron job:

```bash
sudo crontab -e
```

Add:

```cron
0 0 * * * /usr/bin/certbot renew --quiet
```

### 🔍 What this does:

- Runs the cert renewal every day at midnight.
- If renewal is needed (cert expires in <30 days), it fetches a new one and reloads Nginx silently.

---

## 🔄 (Optional) Redirect HTTP → HTTPS

Edit your Nginx config (`/etc/nginx/conf.d/nestjs.conf`) to force HTTPS:

```nginx
server {
    listen 80;
    server_name app.54-165-91-101.nip.io;
    return 301 https://$host$request_uri;
}
```

> This ensures that all HTTP traffic is redirected securely to HTTPS.

---

## 🔐 Security Group Settings (EC2)

Make sure your EC2 **security group** allows:

- TCP **port 22** (for SSH)
- TCP **port 80** (for HTTP)
- TCP **port 443** (for HTTPS)

You can edit this in the AWS console under **EC2 > Security Groups**.

---

## ✅ Final Result

Your NestJS app is now:

- Publicly accessible at `https://app.54-165-91-101.nip.io`
- Secured with a free SSL certificate
- Auto-renewing every 90 days
- Using Nginx for reverse proxy and HTTPS termination

---

## 🧹 Recap of Commands

```bash
# Install Nginx
sudo dnf install nginx -y

# Configure reverse proxy
sudo nano /etc/nginx/conf.d/nestjs.conf
sudo nginx -t
sudo systemctl reload nginx

# Install Certbot
sudo dnf install -y epel-release
sudo dnf install -y certbot python3-certbot-nginx

# Get SSL
sudo certbot --nginx -d app.54-165-91-101.nip.io

# Install cron
sudo dnf install cronie -y
sudo systemctl enable crond
sudo systemctl start crond

# Add auto-renewal
sudo crontab -e
```
