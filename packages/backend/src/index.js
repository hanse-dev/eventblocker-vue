const express = require('express');
const cors = require('cors');
const path = require('path');
const eventRoutes = require('./routes/events');
const { router: authRoutes, authenticateToken } = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? false : '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/auth', authRoutes);

// Public event routes (GET and booking) and protected event routes
app.use('/api/dates', (req, res, next) => {
  // For GET requests, check if admin token is provided
  if (req.method === 'GET') {
    if (req.headers.authorization) {
      return authenticateToken(req, res, next);
    }
    return next();
  }
  
  // For booking requests, no auth needed
  if (req.method === 'POST' && req.path.endsWith('/book')) {
    return next();
  }
  
  // All other routes require authentication
  return authenticateToken(req, res, next);
}, eventRoutes);

// API health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'API is running' });
});

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't handle API routes here
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
    return;
  }
  
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
