const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: String,
  hexCode: String,
  date: { type: Date, default: Date.now }
});

const Color = mongoose.model('Color', colorSchema);