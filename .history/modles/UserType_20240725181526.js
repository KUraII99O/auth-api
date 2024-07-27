const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema({
  id:  String,  
  typeName:  String,
  userId: String,


});

const UserType = mongoose.model("ExpensePurpose", UserTypeSchema);

module.exports = UserType;
