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

// Cold-start Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✔️ MongoDB connected'))
  .catch(e => console.error(e));

// Mount routers
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/trivia', require('./routes/trivia'));
app.use('/api/users',  require('./routes/users'));

// Export for Vercel
module.exports = app;

// Local server
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`🚀 API listening on http://localhost:${port}`)
  );
}