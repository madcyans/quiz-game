  require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');

  const app = express();

  // Apply CORS only during development (for local testing)
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
  }

  app.use(express.json());

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(console.error);

  // Mount routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/trivia', require('./routes/trivia'));
  app.use('/api/users',  require('./routes/users'));

  module.exports = app;