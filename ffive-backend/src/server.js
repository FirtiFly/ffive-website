const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test database connection
testConnection();

// Routes
app.use('/api/players', require('./routes/players'));
app.use('/api/news', require('./routes/news'));

// Basic routes
app.get('/', (req, res) => {
  res.json({
    message: 'FFIVE Esports API is working! 🎮',
    version: '1.0.0',
    endpoints: {
      players: '/api/players',
      news: '/api/news',
      health: '/api/health'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK ✅',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// 404 handler
app.use(notFound);

// Error handler (должен быть последним middleware)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('🚀 FFIVE Esports Server started');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`👥 Players: http://localhost:${PORT}/api/players`);
  console.log(`📰 News: http://localhost:${PORT}/api/news`);
});