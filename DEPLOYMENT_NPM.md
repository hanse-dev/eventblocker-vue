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

3. Deploy using a single command:
```bash
npm run deploy
```

This command will:
- Install all dependencies
- Build the frontend
- Copy frontend files to backend
- Start the server

## Manual Deployment Steps

If you prefer to run commands separately:

1. Install dependencies:
```bash
npm install
```

2. Build the frontend and copy to backend:
```bash
npm run build
```

3. Start the server:
```bash
npm run start
```

## Environment Variables

### Backend (packages/backend/.env)
- `PORT`: The port to run the server on (default: 3001)
- `DATABASE_URL`: SQLite database URL
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend (packages/frontend/.env.production)
- `VITE_API_URL`: API URL (default: /api)

## Available NPM Commands

- `npm run deploy`: Full deployment (install, build, start)
- `npm run build`: Build frontend and copy to backend
- `npm run start`: Start the backend server
- `npm run dev`: Start development servers

## Maintenance

### Updates

To update the application:

1. Pull latest changes:
```bash
git pull origin main
```

2. Redeploy:
```bash
npm run deploy
```

### Monitoring

Monitor the application logs:
```bash
npm run start
```

### Database Management

The SQLite database will be created in the packages/backend directory. Make regular backups of the prod.db file.

## Troubleshooting

1. If the server fails to start, check:
   - Port availability: Make sure port 3001 is free
   - File permissions: Ensure write access to the public directory
   - Database: Check if prod.db is writable

2. If the frontend doesn't load:
   - Check if the build was successful
   - Verify the contents of the public directory
   - Check the API URL in .env.production

3. Common issues:
   - "EADDRINUSE": Port is already in use, change PORT in .env
   - "EACCES": Permission denied, check file permissions
   - Database errors: Check DATABASE_URL and file permissions
