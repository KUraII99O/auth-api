const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  companyName: String,
  phoneNumber: String,
  email: String,
  address: String,
  image: String,
  
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier ;
