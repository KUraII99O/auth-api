const mongoose = require("mongoose");

const vaccineMonitorSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  description: String,
  date: Date,
  dose: String,
});

const VaccineMonitor = mongoose.model("VaccineMonitor", vaccineMonitorSchema);