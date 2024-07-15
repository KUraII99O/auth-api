const mongoose = require('mongoose');

// Define the CowFeed schema
const CowFeedSchema = new mongoose.Schema({
    id: { type: String, },
  date: { type: String},
  stallNo: { type: String},
  cowNumber: { type: String},
  note: { type: String},
  foodItem: { type: String},
  quantity: { type: String},
  feedingTime: { type: String},
  unit: { type: String},
  foodItem: { type: String},
  userId: { type: String, },
  
});

// Register the CowFeed model
const CowFeed = mongoose.model('CowFeed', CowFeedSchema);

module.exports = CowFeed; // Export the model for use in other modules