const mongoose = require('mongoose');

// Define the schema for UserType
const AnimalTypeSchema = new mongoose.Schema({
name: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, required: true },


});

const Designation = mongoose.model('Designation', AnimalTypeSchema);
module.exports = Designation;
