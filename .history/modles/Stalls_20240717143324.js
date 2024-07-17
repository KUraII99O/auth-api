const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  stallNumber: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  date: { type: String, required: true }
});

const Stall = mongoose.model("Stall", stallSchema);