const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema(
  id:  : Number, 
  userId:  : Number,
  image:  : String, 
  animal:  : String, 
  buyDate:  : Number, 
  buyingPrice:  : Boolean, 
  dateAdded:  : Date, default: Date.now,
  pregnantStatus:  : Number,  unique: true,
  milkPerDay:  : Number, 
  animalStatus:  : String, 
  gender:  : String, 
  stallNumber:  : Number, 
  dateOfBirth:  : Boolean, 
  animalAgeDays:  : Date, default: Date.now,
  weight:  : Number,  unique: true,
  height:  : Number, 
  color:  : String, 
  numOfPregnant:  : String, 
  nextPregnancyApproxTime:  : Number, 
  buyFrom:  : Boolean, 
  dateAdded:  : Date, default: Date.now,
  prevVaccineDone:  : Number,  unique: true,
  note:  : Number, 
  CreatedBy:  : String, 
  BDV:  : String, 
  PI3:  : Number, 
  BRSV:  : Boolean, 
  BVD:  : Date, default: Date.now,
  VitaminA:  : Date, default: Date.now,
  Anthrax:  : Date, default: Date.now,
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;