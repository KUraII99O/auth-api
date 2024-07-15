const mongoose = require('mongoose');

const MilkSchema = new mongoose.Schema({
  
  id: { type: String, },
  AccountNo: { type: String, },
  StallNo: { type: String, },
  AnimalID: { type: String, },
  Liter: { type: String, },
  CollectedFrom: { type: String, },
  Fate: { type: String, },
  Price: { type: String, required: false },
  Total: { type: String, required: false },
  Date: { type: String, },
  AddedBy: { type: String, },
  userId: { type: String, },


});

const Milk = mongoose.model('Milk', MilkSchema);

module.exports = Milk;