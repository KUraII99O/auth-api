
const mongoose = require('mongoose');




const PregnancySchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    stallNo: String,
    supplier: String,
    name: String,
    contact: String,
    email: String,
    address: String,
    litre: String,
    price: String,
    due: String,
    paid: String,
    date: String,
    soldBy: String,
    invoice: String,
    // Add other fields as needed
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

