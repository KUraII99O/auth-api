const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: { type: String,  },
  stallNumber: { type: String, required: true },
  details: { type: Boolean, required: true, default: true },
  status: { type: String, required: true }
});

const Stall = mongoose.model("Stall", stallSchema);