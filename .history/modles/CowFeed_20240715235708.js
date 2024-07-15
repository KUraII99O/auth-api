const mongoose = require('mongoose');

// Define the CowFeed schema
const CowFeedSchema = new mongoose.Schema({
  date: { type: String, required: true },
  stallNo: { type: String, required: true },
  cowNumber: { type: String, required: true },
  note: { type: String, required: true },
  date: { type: String, required: true },
  // Add other fields as needed
});

// Register the CowFeed model
const CowFeed = mongoose.model('CowFeed', CowFeedSchema);

module.exports = CowFeed; // Export the model for use in other modules