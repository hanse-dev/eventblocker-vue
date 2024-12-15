# Termin-Buchungssystem

A modern appointment booking system built with Vue.js and Node.js.

## Environment Configuration

The application uses environment variables for configuration. Both the frontend and backend have their own `.env` files.

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd packages/backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   - `PORT`: The port the backend server will run on
   - `DATABASE_URL`: Your PostgreSQL database connection string
   - `JWT_SECRET`: A secure secret key for JWT token generation
   - `FRONTEND_URL`: The URL where your frontend is running
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD`: Default admin credentials

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd packages/frontend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   - `VITE_API_URL`: The URL of your backend API
   - `VITE_DEFAULT_LOCALE`: The default locale for date formatting
   - `VITE_DEFAULT_TIMEZONE`: Your application's timezone

### Important Notes

- Never commit the actual `.env` files to version control
- Always use secure values in production
- Keep the JWT_SECRET private and change it in production
- Update the admin credentials in production

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the environment files as described above

3. Start the development servers:
   ```bash
   # Start backend
   cd packages/backend
   npm run dev

   # Start frontend (in a new terminal)
   cd packages/frontend
   npm run dev
   ```

4. Visit `http://localhost:5173` in your browser

## License

[MIT License](LICENSE)
