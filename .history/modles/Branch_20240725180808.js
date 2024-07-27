const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  id: String,
  userId: String,
  branchName: String,
  setupDate: String,
  builderName: String,
  phoneNumber: String,
  email: String,
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
