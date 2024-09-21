const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String }, // Ensure id is a string
  email: String,
  username: String,
  password: String,
  plan: Object,
  type: String,
  name: String,
  mobile: String,
  designation: String,
  joiningDate: Date,
  permanentAddress: String,
  nid: String,
  image: String,
  userType: String,
  presentAddress: String,
  basicSalary: String,
  grossSalary: String,
  resignDate: Date,
  status: Boolean,
});

module.exports = mongoose.model("User", userSchema);
