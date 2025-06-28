const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  score: { type: Number, default: 0 },
  highscore:{ type: Number, default: 0 },
  history: [{
    question: String,
    yourAnswer: String,
    correct: Boolean,
    timestamp: Date
  }]
});
module.exports = model('User', UserSchema);