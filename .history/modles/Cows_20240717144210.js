const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  image: { type: String, required: true },
  animalType: { type: String, required: true },
  buyDate: { type: Number, required: true },
  buyingPrice: { type: Boolean, default: true },
  dateAdded: { type: Date, default: Date.now },
  pregnantStatus: { type: Number, required: true, unique: true },
  milkPerDay: { type: Number, required: true },
  animalStatus: { type: String, required: true },
  gender: { type: String, required: true },
  stallNumber: { type: Number, required: true },
  dateOfBirth: { type: Boolean, default: true },
  animalAgeDays: { type: Date, default: Date.now },
  weight: { type: Number, required: true, unique: true },
  height: { type: Number, required: true },
  color: { type: String, required: true },
  numOfPregnant: { type: String, required: true },
  nextPregnancyApproxTime: { type: Number, required: true },
  buyFrom: { type: Boolean, default: true },
  dateAdded: { type: Date, default: Date.now },
  prevVaccineDone: { type: Number, required: true, unique: true },
  note: { type: Number, required: true },
  CreatedBy: { type: String, required: true },
  BDV: { type: String, required: true },
  PI3: { type: Number, required: true },
  BRSV: { type: Boolean, default: true },
  BVD: { type: Date, default: Date.now },
  VitaminA: { type: Date, default: Date.now },
  Anthrax: { type: Date, default: Date.now },
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;