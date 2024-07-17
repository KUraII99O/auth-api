const mongoose = require("mongoose");

const vaccineMonitorSchema = new mongoose.Schema({
  id: String,
  userId: String,
  stallNo: String,
  description: String,
  date: Date,
  dose: String,
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