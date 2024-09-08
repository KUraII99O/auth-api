const mongoose = require("mongoose");

const calfsSchema = new mongoose.Schema({
  id: String,
  userId: String,
  image: String,
  animalType: String,
  buyDate: Date,
  buyingPrice: Number,
  motherID: String,
  gender: String,
  status: Boolean,
  informations: {
    stallNumber: String,
    dateOfBirth: Date,
    animalAgeDays: Number,
    weight: Number,
    height: Number,
    color: String,
    buyFrom: String,
    prevVaccineDone: String,
    note: String,
    CreatedBy: String,
  },
  vaccinations: {
    BDV: Boolean,
    BVD: Boolean,
    PI3: Boolean,
    BRSV: Boolean,
    VitaminA: Boolean,
    Anthrax: Boolean,
  },
});

const Calf = mongoose.model("Calf", calfsSchema);

module.exports = Calf;
