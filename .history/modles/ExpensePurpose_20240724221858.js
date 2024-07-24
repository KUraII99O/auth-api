const mongoose = require("mongoose");

const ExpensePurposeSchema = new mongoose.Schema({
  id:  String,  
  stallNumber:  String,
  details:  String,  
  status:  Boolean,
  userId: String,


});

const ExpensePurpose = mongoose.model("ExpensePurpose", stallSchema);

module.exports = ExpensePurpose;
