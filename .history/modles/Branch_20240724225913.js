const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  date: { type: String, default: new Date().toLocaleDateString() }, // Default current date
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;