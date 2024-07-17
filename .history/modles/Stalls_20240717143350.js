const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  id: { type: String,  },
  stallNumber: { type: String},
  details: { type: Boolean, required: true, default: true },
  status: { type: StriBooleanng}
});

const Stall = mongoose.model("Stall", stallSchema);