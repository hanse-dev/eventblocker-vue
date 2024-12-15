const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Willkommen beim Termin-Buchungssystem API' });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
