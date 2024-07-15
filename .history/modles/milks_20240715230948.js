const mongoose = require('mongoose');

const MilkSchema = new mongoose.Schema({
  id: { type: String, },
  string: { type: String, },
  StallNo: { type: String, },
  AnimalID: { type: String, },
  Liter: { type: String, },
  monthlySalary: { type: String, },
  additionMoney: { type: String, },
  note: { type: String, required: false },
  image: { type: String, required: false },
  userId: { type: String, },

});

const Milk = mongoose.model('Milk', MilkSchema);

module.exports = Milk;