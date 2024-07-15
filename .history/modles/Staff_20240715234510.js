const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({

id: { type: String, required: true }, // Ensure id is a string
name: String,
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

const Staff = mongoose.model('Employee', EmployeeSchema);
