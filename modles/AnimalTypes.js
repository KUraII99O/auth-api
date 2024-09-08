const mongoose = require("mongoose");

// Define the schema for UserType
const AnimalTypeSchema = new mongoose.Schema({
  name: String,
  id: String,
  userId: String,
});

const AnimalType = mongoose.model("AnimalType", AnimalTypeSchema);
module.exports = AnimalType;
