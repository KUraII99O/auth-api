const mongoose = require("mongoose");

const VaccineSchema = new mongoose.Schema({
  id:  String,  
  vaccineName:  String,
  periodDays: String,
  repeatVaccine: Boolean,
  dose: String,
  note: String,
  userId: String,


});

const Vaccine  = mongoose.model("Vaccine ", VaccineSchema);

module.exports = Vaccine;
