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
  weight:   Number, 
  height:  Number, 
  color:   String, 
  numOfPregnant:   String, 
  nextPregnancyApproxTime:   Number, 
  buyFrom:   Boolean, 
  dateAdded:   Date,  
  prevVaccineDone:  Number,  
  note:   Number, 
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