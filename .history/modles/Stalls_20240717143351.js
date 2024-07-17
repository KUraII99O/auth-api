const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: { type: String,  },
  stallNumber: { type: String},
  details: { type: Boolean, required: true, default: true },
  status: { type: Boolean}
});

const Stall = mongoose.model("Stall", stallSchema);