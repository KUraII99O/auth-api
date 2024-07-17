const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  stallNumber: { type: String, required: true },
  details: { type: Boolean, required: true, default: true },
  status: { type: String, required: true }
});

const Stall = mongoose.model("Stall", stallSchema);