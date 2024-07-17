const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id:  String,  
  stallNumber:  String,
  details:  String,  
  status:  Boolean,
  userId: String,


});

const Stall = mongoose.model("Stall", stallSchema);