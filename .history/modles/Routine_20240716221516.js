const mongoose = require('mongoose');

const RoutineMonitorSchema = new mongoose.Schema({
  id: String,
  userId: String,
  stallNo: String,
  animalID: String,
  date: String,
  note: String,
  reportedby: String,
  healthStatus: String,
  ServiceName: String,
  Result: String,
  MonitoringTime: String,
  updatedWeight: String,
  updatedHeight: String,
  milkPerDay: String,
  monitoringDate: String,
  reports: String,
  // Add other fields as necessary
});

const RoutineMonitor = mongoose.model('RoutineMonitor', RoutineMonitorSchema);

module.exports = RoutineMonitor;

stallNo: "",
animalID: "",
date: currentDate,
note: "",
reportedby: "",
healthStatus: 50,
informations: Array.from({ length: 3 }, () => ({
  ServiceName: "",
  Result: "",
  MonitoringTime: "",
})),
updatedWeight: "",
updatedHeight: "",
milkPerDay: "",
monitoringDate: "",
reports: "",
});