const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema(
  id:   Number, 
  userId:   Number,
  image:  String, 
  animal:   String, 
  buyDate:   Number, 
  buyingPrice:   Boolean, 
  dateAdded:   Date,  
  pregnantStatus:   Number,
  milkPerDay:   Number, 
  animalStatus:   String, 
  gender:   String, 
  stallNumber:   Number, 
  dateOfBirth:   Boolean, 
  animalAgeDays:   Date,  
  weight:   Number, 
  height:  Number, 
  color:   String, 
  numOfPregnant:   String, 
  nextPregnancyApproxTime:   Number, 
  buyFrom:   Boolean, 
  dateAdded:   Date,  
  prevVaccineDone:   Number,  
  note:   Number, 
  CreatedBy:   String, 
  BDV:   String, 
  PI3:   Number, 
  BRSV:   Boolean, 
  BVD:  :Date,  
  VitaminA:   Date,  
  Anthrax:   Date,  
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;