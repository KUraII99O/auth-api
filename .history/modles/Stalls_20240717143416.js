const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: type: String,  ,
  stallNumber:  String,
  details:  String,  ,
  status: type: Boolean
  userId: String,
);

const Stall = mongoose.model("Stall", stallSchema);