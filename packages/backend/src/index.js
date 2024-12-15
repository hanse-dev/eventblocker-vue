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

// Protected routes
app.use('/api/dates', authenticateToken, eventRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Willkommen beim Termin-Buchungssystem API' });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
