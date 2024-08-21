


const mongoose = require("mongoose");

const monitoringServiceSchema = new mongoose.Schema({
    id:String,
    serviceName: String,
    userId: String,


});

const MonitoringService  = mongoose.model("MonitoringService ", monitoringServiceSchema);

module.exports = MonitoringService;


