const milkSaleSchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    accountNo: String,
    supplier: Number,
    name: Date,
    contact: Date,
    email: Date,
    address: Date,
    litre: Date,
    price: Date,
    total: Date,
    // Add other fields as needed
  });
  
  const MilkSale = mongoose.model('MilkSale', milkSaleSchema);