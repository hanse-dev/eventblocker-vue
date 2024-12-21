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
VITE_API_URL=https://your-api-domain.com
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
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/eventblocker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

3. **SSL Configuration (Recommended)**

Install Certbot and obtain SSL certificate:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Maintenance

### Backup Database

Create a backup script `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
cp /path/to/backend/prod.db /path/to/backups/prod_$DATE.db
```

Add to crontab:

```bash
0 0 * * * /path/to/backup.sh
```

### Updates

To update the application:

1. Pull latest changes:
```bash
git pull origin main
```

2. Update backend:
```bash
cd packages/backend
npm install
npx prisma generate
npx prisma migrate deploy
pm2 restart eventblocker-backend
```

3. Update frontend:
```bash
cd packages/frontend
npm install
npm run build
```

## Monitoring

1. **Monitor Backend**
```bash
pm2 monit
pm2 logs eventblocker-backend
```

2. **View Nginx Logs**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Security Considerations

1. **Firewall Setup**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

2. **Regular Updates**
```bash
sudo apt update
sudo apt upgrade
```

3. **Database Backup**
- Regularly backup the SQLite database
- Store backups in a secure location
- Test backup restoration periodically

## Troubleshooting

1. **Backend Issues**
- Check PM2 logs: `pm2 logs`
- Verify database connection
- Check environment variables

2. **Frontend Issues**
- Check browser console for errors
- Verify API endpoint configuration
- Check Nginx error logs

3. **Common Solutions**
- Restart PM2: `pm2 restart all`
- Restart Nginx: `sudo systemctl restart nginx`
- Clear browser cache
- Check file permissions

## Support

For additional support or questions, please refer to:
- Project documentation
- GitHub issues
- Development team contacts
