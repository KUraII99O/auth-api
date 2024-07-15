const mongoose = require('mongoose');

// Define the CowFeed schema
const CowFeedSchema = new mongoose.Schema({
  date: { type: String},
  stallNo: { type: String},
  cowNumber: { type: String},
  note: { type: String},
  foodItem: { type: String},
  quantity: { type: String},
  feedingTime: { type: String},
  unit: { type: String},
  foodItem: { type: String},
  // Add other fields as needed
});

// Register the CowFeed model
const CowFeed = mongoose.model('CowFeed', CowFeedSchema);

module.exports = CowFeed; // Export the model for use in other modules