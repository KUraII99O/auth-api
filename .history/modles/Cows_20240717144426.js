const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema(
  id:   String, 
  userId:   String,
  image:  String, 
  animal:   String, 
  buyDate:   String, 
  buyingPrice:   Boolean, 
  dateAdded:   Date,  
  pregnantStatus:   String,
  milkPerDay:   String, 
  animalStatus:   String, 
  gender:   String, 
  stallNumber:   String, 
  dateOfBirth:   Boolean, 
  animalAgeDays:   Date,  
  weight:   String, 
  height:  String, 
  color:   String, 
  numOfPregnant:  String, 
  nextPregnancyApproxTime:   String, 
  buyFrom:   String, 
  dateAdded:   Date,  
  prevVaccineDone:  String,  
  note:   String, 
  CreatedBy:   String, 
  BDV:   Boolean, 
  PI3:   Boolean, 
  BRSV:   Boolean, 
  BVD:  Boolean,  
  VitaminA: Boolean,  
  Anthrax:  Boolean,  
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;