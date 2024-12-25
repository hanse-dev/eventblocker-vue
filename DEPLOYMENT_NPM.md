# NPM-Only Deployment Guide

This guide explains how to deploy the Event Blocker application using only npm commands.

## Prerequisites

- Node.js 16+ installed on the server
- NPM 7+ installed on the server
- Git installed on the server (for cloning the repository)

## Deployment Steps

1. Clone the repository:
```bash
git clone <your-repo-url>
cd eventblocker-vue
```

2. Create environment files:

Backend (.env in packages/backend):
```env
PORT=3001
DATABASE_URL="file:./prod.db"
JWT_SECRET="your-secure-jwt-secret"
```

Frontend (.env.production in packages/frontend):
```env
API_URL=/api
```

3. Install dependencies and build:
```bash
# Install root dependencies
npm install

# Install and build frontend
cd packages/frontend
npm install
npm run build

# Install and setup backend
cd ../backend
npm install
npx prisma generate
npx prisma migrate deploy
```

4. Start the server:
```bash
npm run start
```

## Environment Variables

### Backend (packages/backend/.env)
Required variables:
- `PORT`: The port to run the server on (default: 3001)
- `DATABASE_URL`: SQLite database URL
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend (packages/frontend/.env.production)
Required variables:
- `API_URL`: API URL (default: /api)

## Available NPM Scripts

In the frontend directory:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

In the backend directory:
- `npm run dev`: Start development server
- `npm run start`: Start production server
- `npm run migrate`: Run database migrations

## Maintenance

### Updates

To update the application:

1. Pull latest changes:
```bash
git pull origin main
```

2. Rebuild and restart:
```bash
# Update and rebuild frontend
cd packages/frontend
npm install
npm run build

# Update and restart backend
cd ../backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run start
```

### Database Backup

Create regular backups of your SQLite database:
```bash
cd packages/backend
cp prod.db prod.db.backup-$(date +%Y%m%d)
```

### Logs

View application logs:
```bash
# Backend logs
cd packages/backend
npm run logs

# Or use direct file access
tail -f logs/app.log
```

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Verify Node.js version compatibility
   - Check webpack configuration

2. **Runtime Errors**
   - Check environment variables
   - Verify API URL configuration
   - Check database connectivity
   - Review application logs

3. **Database Issues**
   - Verify database file permissions
   - Check Prisma schema version
   - Run migrations manually if needed

### Quick Fixes

1. Clean installation:
```bash
rm -rf node_modules
rm -rf packages/*/node_modules
npm install
cd packages/frontend && npm install
cd ../backend && npm install
```

2. Reset database:
```bash
cd packages/backend
rm prod.db
npx prisma migrate reset
```

3. Rebuild frontend:
```bash
cd packages/frontend
rm -rf dist
npm run build
```
