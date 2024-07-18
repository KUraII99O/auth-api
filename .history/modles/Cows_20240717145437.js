const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
    id: { type: String, },
    userId: { type: String, required: true },
  image: { type: String, required: false },
  animal: { type: String, required: true },
  buyDate: { type: String, required: false },
  buyingPrice: { type: Number, required: false },
  dateAdded: { type: Date, default: Date.now },
  pregnantStatus: { type: String, required: false },
  milkPerDay: { type: String, required: false },
  animalStatus: { type: String, required: false },
  gender: { type: String, required: false },
  stallNumber: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  animalAgeDays: { type: Number, required: false },
  weight: { type: String, required: false },
  height: { type: String, required: false },
  color: { type: String, required: false },
  numOfPregnant: { type: String, required: false },
  nextPregnancyApproxTime: { type: String, required: false },
  buyFrom: { type: String, required: false },
  prevVaccineDone: { type: String, required: false },
  note: { type: String, required: false },
  createdBy: { type: String, required: false },
  BDV: { type: Boolean, required: false },
  PI3: { type: Boolean, required: false },
  BRSV: { type: Boolean, required: false },
  BVD: { type: Boolean, required: false },
  VitaminA: { type: Boolean, required: false },
  Anthrax: { type: Boolean, required: false },
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;
