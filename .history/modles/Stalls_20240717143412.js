const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: type: String,  ,
  stallNumber: { type: String,
  details: type: String,  ,
  status: type: Boolean
  userId: String,
);

const Stall = mongoose.model("Stall", stallSchema);