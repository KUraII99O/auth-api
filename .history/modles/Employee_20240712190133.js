const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  payDate: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  employeeName: { type: String, required: true },
  monthlySalary: { type: String, required: true },
  additionMoney: { type: String, required: true },
  note: { type: String, required: false },
  image: { type: String, required: false },
  userId: String,

});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;