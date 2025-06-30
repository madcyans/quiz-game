if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const app      = express();

// ✅ CORS — allow Vercel frontend and test tools
const allowedOrigins = [
  'https://quiz-game-mauve-three.vercel.app',
  'https://quiz-game-fawn-nine.vercel.app',
  'https://quiz-game-d89x.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 🛠 Debug: log incoming origins
app.use((req, res, next) => {
  console.log('🌐 Origin:', req.headers.origin, '→', req.method, req.originalUrl);
  next();
});

app.use(express.json());

// 🔌 MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🧭 Routes
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/trivia', require('./routes/trivia'));
app.use('/api/users',  require('./routes/users'));

// ⚡ Health check
app.get('/api/ping', (_req, res) => res.json({ status: 'pong' }));

module.exports = app;