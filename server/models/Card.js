const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  email: String,
  phone: String,
  company: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', CardSchema);
