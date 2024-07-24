const mongoose = require("mongoose");

const ExpensePurposeSchema = new mongoose.Schema({
  id:  String,  
  stallNumber:  String,
  
  userId: String,


});

const ExpensePurpose = mongoose.model("ExpensePurpose", ExpensePurposeSchema);

module.exports = ExpensePurpose;
