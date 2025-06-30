// api/index.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const app      = express();

// CORS: allow your Vercel front-end + any others you need
const allowedOrigins = [
  'https://quiz-game-mauve-three.vercel.app',  // ← your current Vercel URL
  'https://quiz-game-fawn-nine.vercel.app',    // ← any old/staging URL
  'https://quiz-game-d89x.onrender.com'        // ← your Render API itself (for tools/tests)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);            // allow non-browser calls
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// IMPORTANT: respond to preflight RIGHT AWAY
app.options('*', cors());

// Body parser
app.use(express.json());

// Mongo boot
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/trivia', require('./routes/trivia'));
app.use('/api/users',  require('./routes/users'));

// Health-check
app.get('/api/ping', (_req, res) => res.json({ status: 'pong' }));

module.exports = app;