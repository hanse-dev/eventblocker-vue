const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/events');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/dates', eventRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Willkommen beim Termin-Buchungssystem API' });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
