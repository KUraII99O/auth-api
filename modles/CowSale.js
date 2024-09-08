const mongoose = require('mongoose');




const CowSaleSchema = new mongoose.Schema({
   status: Boolean,
  id: String,
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  address: String,
  totalPrice: String,
  totalPaid: String,
  due: String,
  note: String,
  collectedFrom: String,
  image: String,
  stallNo: String,
  cowNumber: String,
  gender: String,
  weight: String,
  height: String,
  userId: String,
  });
  
  const CowSale = mongoose.model('CowSale', CowSaleSchema);

  module.exports = CowSale; // Export the model for use in other modules
