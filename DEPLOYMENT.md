# Deployment Guide

This guide explains how to deploy the Event Blocker application to a production server.

## Prerequisites

- Node.js 16+ installed on the server
- A web server (e.g., Nginx or Apache)
- PM2 or similar process manager for Node.js
- SQLite (included with Node.js)

## Backend Deployment

1. **Prepare the Backend**

```bash
cd packages/backend
npm install --production
npx prisma generate
npx prisma migrate deploy
```

2. **Environment Setup**

Create a `.env` file in the `packages/backend` directory:

```env
PORT=3000
DATABASE_URL="file:./prod.db"
JWT_SECRET="your-secure-jwt-secret"
```

3. **Install PM2 Globally**

```bash
npm install -g pm2
```

4. **Create PM2 Configuration**

Create `ecosystem.config.js` in the backend directory:

```javascript
module.exports = {
  apps: [{
    name: 'eventblocker-backend',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

5. **Start the Backend**

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Frontend Deployment

1. **Build the Frontend**

Update `packages/frontend/.env.production`:

```env
API_URL=/api
```

Build the application:

```bash
cd packages/frontend
npm install
npm run build
```

2. **Nginx Configuration**

Create an Nginx configuration file `/etc/nginx/sites-available/eventblocker`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, no-transform";
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable the Site**

```bash
ln -s /etc/nginx/sites-available/eventblocker /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## SSL Configuration (Recommended)

1. **Install Certbot**

```bash
apt-get update
apt-get install certbot python3-certbot-nginx
```

2. **Obtain SSL Certificate**

```bash
certbot --nginx -d your-domain.com
```

## Maintenance

### Updating the Application

1. Pull the latest changes:
```bash
git pull origin main
```

2. Rebuild the frontend:
```bash
cd packages/frontend
npm install
npm run build
```

3. Update the backend:
```bash
cd ../backend
npm install
npx prisma generate
npx prisma migrate deploy
pm2 restart eventblocker-backend
```

### Backup

1. **Database Backup**
```bash
cd packages/backend
cp prod.db prod.db.backup-$(date +%Y%m%d)
```

2. **Frontend Backup**
```bash
cd packages/frontend
cp -r dist dist.backup-$(date +%Y%m%d)
```

### Monitoring

1. **View Backend Logs**
```bash
pm2 logs eventblocker-backend
```

2. **View Nginx Logs**
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Troubleshooting

1. **Frontend Issues**
- Check browser console for errors
- Verify the API_URL in `.env.production`
- Check Nginx configuration and logs

2. **Backend Issues**
- Check PM2 logs: `pm2 logs eventblocker-backend`
- Verify environment variables
- Check database connectivity

3. **Database Issues**
- Check database file permissions
- Verify DATABASE_URL in backend .env
- Check Prisma migration status
