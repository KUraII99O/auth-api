const mongoose = require('mongoose');

const RoutineMonitorSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  description: String,
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