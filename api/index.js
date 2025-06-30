if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express  = require('express');
const mongoose = require('mongoose');
const app      = express();

// 🔧 Force-set CORS headers manually, no middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://quiz-game-mauve-three.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// 🧠 Debug CORS hits
app.use((req, _res, next) => {
  console.log('📡 Origin:', req.headers.origin, '→', req.method, req.originalUrl);
  next();
});

// 🧬 Connect Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🗺 Routes
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/trivia', require('./routes/trivia'));
app.use('/api/users',  require('./routes/users'));

// ❤️ Health check
app.get('/api/ping', (_req, res) => res.json({ status: 'pong' }));

module.exports = app;