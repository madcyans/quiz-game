if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const app      = express();

// Dev-only CORS
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
app.use(express.json());

// Cold-start Mongo (don’t try to send a response here)
mongoose.connect(process.env.MONGO_URI, { 
    // optional options: useNewUrlParser, useUnifiedTopology, etc.
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mount routers
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/trivia', require('./routes/trivia'));
app.use('/api/users',  require('./routes/users'));

// Health-check endpoint (optional, but handy)
app.get('/api/ping', (req, res) => res.json({ status: 'pong' }));

// Export for Vercel
module.exports = app;

// Local server
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`🚀 API listening on http://localhost:${port}`)
  );
}