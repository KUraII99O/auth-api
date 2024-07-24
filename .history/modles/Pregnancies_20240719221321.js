const mongoose = require("mongoose");

const PregnancySchema = new mongoose.Schema({
  animalId: String,
  userId: String,
  stallNo: String,
  pregnancyType: String,
  semenType: String,
  semenPushDate: String,
  pregnancyStartDate: String,
  semenCost: String,
  otherCost: String,
  note: String,
  due: String,
  pregnancyStatus: Boolean,
});

const Pregnancy = mongoose.model("Pregnancy", PregnancySchema);

module.exports = Pregnancy;
