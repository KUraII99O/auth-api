const mongoose = require("mongoose");

const vaccineMonitorSchema = new mongoose.Schema({
  id: String,
  userId: String,
  stallNo: String,
  CowNumber: String,
  date: Date,
  reportedby: String,
  Dose: String,
  Repeat: String,
  Remarks: String,
  GivenTime: String,
});

const VaccineMonitor = mongoose.model("VaccineMonitor", vaccineMonitorSchema);

module.exports = VaccineMonitor;
stallNo: "",
CowNumber: "",
date: "",
note: "",
reportedby: "",
informations: Array.from({ length: 3 }, () => ({
  VaccineName: "",
  Dose: "",
  Repeat: "",
  Remarks: "",
  GivenTime: "",
})),
});