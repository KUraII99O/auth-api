const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({

id: String,  // Ensure id is a string
employeeName: String,
email: String,
mobile: String,
designation: String,
joiningDate: String,
permanentAddress: String,
nid: String,
image: String,
userType: String,
presentAddress: String,
basicSalary: String,
grossSalary: String,
resignDate: String,
status: Boolean,
userId: String,
});

const Staff = mongoose.model('Staff', StaffSchema);

module.exports = Staff;
