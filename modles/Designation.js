const mongoose = require('mongoose');

// Define the schema for UserType
const DesignationSchema = new mongoose.Schema({
name: { type: String},
  id: { type: String},
  userId: { type: String},


});

const Designation = mongoose.model('Designation', DesignationSchema);
module.exports = Designation;
