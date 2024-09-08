const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  id: { type: String },
  image: { type: String },
  userId: { type: String },
  animal: { type: String },
  buyDate: { type: String },
  stallNumber: { type: String },
  buyingPrice: { type: String },
  dateAdded: { type: String },
  pregnantStatus: { type: String },
  milkPerDay: { type: String },
  status: { type: Boolean, default: false },
  gender: { type: String },
  informations: {
    stallNumber: { type: String },
    dateOfBirth: { type: String },
    animalAgeDays: { type: String },
    weight: { type: String },
    height: { type: String },
    color: { type: String },
    numOfPregnant: { type: String },
    nextPregnancyApproxTime: { type: String },
    buyFrom: { type: String },
    prevVaccineDone: { type: String },
    note: { type: String },
    createdBy: { type: String },
  },
  vaccinations: {
    BDV: { type: Boolean, default: false },
    PI3: { type: Boolean, default: false },
    BRSV: { type: Boolean, default: false },
    BVD: { type: Boolean, default: false },
    VitaminA: { type: Boolean, default: false },
    Anthrax: { type: Boolean, default: false },
  },
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;
