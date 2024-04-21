const express = require('express');
const api = require('./api');

const app = express();
const PORT = 3000; // You can choose any port number

// Middleware
app.use(express.json());

// Static files
app.use(express.static('public'));

// API Routes
app.use('/api', api);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});