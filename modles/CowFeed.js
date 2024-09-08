const mongoose = require("mongoose");

// Define the CowFeed schema
const CowFeedSchema = new mongoose.Schema({
  id: { type: String,  }, // Use your custom id field
  date: { type: String },
  StallNo: { type: String },
  cowNumber: { type: String },
  note: { type: String },
  informations: {
    foodItem: { type: String },
    quantity: { type: String },
    feedingTime: { type: String },
    unit: { type: String },
    foodItem: { type: String },
    userId: { type: String },
  },
});

// Register the CowFeed model
const CowFeed = mongoose.model("CowFeed", CowFeedSchema);

module.exports = CowFeed; // Export the model for use in other modules
