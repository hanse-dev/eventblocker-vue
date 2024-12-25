const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Import routes
const apiRoutes = require('./routes');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory (where frontend build will be)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', apiRoutes);

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
