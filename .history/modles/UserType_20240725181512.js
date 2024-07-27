const mongoose = require("mongoose");

const ExpensePurposeSchema = new mongoose.Schema({
  id:  String,  
  name:  String,
  userId: String,


});

const UserType = mongoose.model("ExpensePurpose", ExpensePurposeSchema);

module.exports = UserType;
