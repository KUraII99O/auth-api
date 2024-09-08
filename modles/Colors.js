const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: String,
  id: String,
  userId: String,
});

const Color = mongoose.model('Color', colorSchema);
module.exports = Color;
