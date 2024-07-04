const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  designation: { type: String },
  joiningDate: { type: Date },
  permanentAddress: { type: String },
  nid: { type: String },
  image: { type: String },
  userType: { type: String },
  presentAddress: { type: String },
  basicSalary: { type: String },
  grossSalary: { type: String },
  resignDate: { type: Date },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', userSchema);