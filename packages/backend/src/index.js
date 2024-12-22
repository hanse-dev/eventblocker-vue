const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/events');
const { router: authRoutes, authenticateToken } = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Auth routes (no authentication required)
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

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Willkommen beim Termin-Buchungssystem API' });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
