const mongoose = require("mongoose");

const vaccineMonitorSchema = new mongoose.Schema({
  id: String,
  userId: String,
  stallNo: String,
  animalID: String,
  date: Date,
  reportedby: String,
  Dose: String,
  Repeat: String,
  Remarks: String,
  GivenTime: String,
  note: String,
});

const VaccineMonitor = mongoose.model("VaccineMonitor", vaccineMonitorSchema);

module.exports = VaccineMonitor;
