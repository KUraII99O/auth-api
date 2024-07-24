const mongoose = require("mongoose");

const ExpensePurposeSchema = new mongoose.Schema({
  id:  String,  
  name:  String,
  
  userId: String,


});

const ExpensePurpose = mongoose.model("ExpensePurpose", ExpensePurposeSchema);

module.exports = ExpensePurpose;
