const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  payDate: { type: String, },
  month: { type: String, },
  year: { type: String, },
  employeeName: { type: String, },
  monthlySalary: { type: String, },
  additionMoney: { type: String, },
  note: { type: String, required: false },
  image: { type: String, required: false },
  userId: String,

});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;