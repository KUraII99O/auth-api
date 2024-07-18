const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema(
  id:  : Number, 
  userId:  : Number, required: true,
  image:  : String, required: true,
  animal:  : String, required: true,
  buyDate:  : Number, required: true,
  buyingPrice:  : Boolean, default: true,
  dateAdded:  : Date, default: Date.now,
  pregnantStatus:  : Number, required: true, unique: true,
  milkPerDay:  : Number, required: true,
  animalStatus:  : String, required: true,
  gender:  : String, required: true,
  stallNumber:  : Number, required: true,
  dateOfBirth:  : Boolean, default: true,
  animalAgeDays:  : Date, default: Date.now,
  weight:  : Number, required: true, unique: true,
  height:  : Number, required: true,
  color:  : String, required: true,
  numOfPregnant:  : String, required: true,
  nextPregnancyApproxTime:  : Number, required: true,
  buyFrom:  : Boolean, default: true,
  dateAdded:  : Date, default: Date.now,
  prevVaccineDone:  : Number, required: true, unique: true,
  note:  : Number, required: true,
  CreatedBy:  : String, required: true,
  BDV:  : String, required: true,
  PI3:  : Number, required: true,
  BRSV:  : Boolean, default: true,
  BVD:  : Date, default: Date.now,
  VitaminA:  : Date, default: Date.now,
  Anthrax:  : Date, default: Date.now,
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;