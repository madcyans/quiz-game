const { Schema, model } = require('mongoose');
const QSchema = new Schema({
  text:     { type: String, required: true },
  choices:  { type: [String], required: true },  // ← new
  answer:   { type: String, required: true }
});
module.exports = model('Question', QSchema);