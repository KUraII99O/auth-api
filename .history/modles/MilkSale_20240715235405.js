const mongoose = require('mongoose');




const milkSaleSchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    accountNo: String,
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
  
  const MilkSale = mongoose.model('MilkSale', milkSaleSchema);

  module.exports = MilkSale; // Export the model for use in other modules
