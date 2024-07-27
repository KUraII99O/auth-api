const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: String,
    id: { type: String, required: true },
    userId: { type: String, required: true },
});

const Color = mongoose.model('Color', colorSchema);