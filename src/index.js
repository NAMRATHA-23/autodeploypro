const express = require('express');
const mongoose = require('mongoose');
const client = require('prom-client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const register = new client.Registry();

// Collect default Node.js metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

app.use(express.json());

// Route 1: Health check — used by Render to verify app is alive
app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// Route 2: Items — proves DB connection works
app.get('/items', async (req, res) => {
    res.json({ items: [], message: 'Connected to MongoDB Atlas!' });
});

// Route 3: Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Start server (connect to DB first)
const start = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
};
start();

module.exports = app; // needed for tests