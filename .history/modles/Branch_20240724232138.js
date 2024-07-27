const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  id: String,
  name: String,
  userId: String,
  branchName: String,
  setupDate: Date,
  builderName: String,
  phoneNumber: String,
  Email: String,
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
