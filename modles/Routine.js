const mongoose = require('mongoose');

const InformationSchema = new mongoose.Schema({
  ServiceName: { type: String  },
  Result: { type: String },
  MonitoringTime: { type: String  },
});

const RoutineMonitorSchema = new mongoose.Schema({
  stallNo: { type: String,  },
  animalID: { type: String,  },
  date: { type: Date, default: Date.now }, // Assuming `currentDate` is the current date
  note: { type: String },
  reportedby: { type: String, },
  healthStatus: { type: Number }, // Assuming this is a  between 0-100
  informations: { type: [InformationSchema], default: [] }, // Array of subdocuments
  updatedWeight: { type: String },
  updatedHeight: { type: String },
  milkPerDay: { type: String },
  monitoringDate: { type: Date, default: Date.now },
  reports: { type: String },
});

const RoutineMonitor = mongoose.model('RoutineMonitor', RoutineMonitorSchema);

module.exports = RoutineMonitor;
