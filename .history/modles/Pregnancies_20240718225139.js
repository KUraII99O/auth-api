
const mongoose = require('mongoose');




const PregnancySchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    stallNo: String,
    pregnancyType: String,
    semenType: String,
    semenPushDate: String,
    pregnancyStartDate: String,
    semenCost: String,
    otherCost: String,
    note: String,
    due: String,
    pregnancyStatus: String,
 
  });
  
  const Pregnancy = mongoose.model('Pregnancy', milkSaleSchema);

  module.exports = Pregnancy;


id: "",
stallNo: "",
animalId: "",
pregnancyType: "",
semenType: "",
semenPushDate: "",
pregnancyStartDate: "",
semenCost: "",
otherCost: "",
note: "",
pregnancyStatus: "",

