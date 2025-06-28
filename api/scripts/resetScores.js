// scripts/resetScores.js
require('dotenv').config();              // load .env
const mongoose = require('mongoose');

async function main() {
  // 1) connect with default options
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✔️ Connected to MongoDB');

  // 2) define a loose User model on the 'users' collection
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }), 'users');

  // 3) reset all scores
  const res = await User.updateMany(
    {},
    { $set: { score: 0, highscore: 0 } }
  );
  console.log(`✅ Modified ${res.modifiedCount} documents.`);
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});