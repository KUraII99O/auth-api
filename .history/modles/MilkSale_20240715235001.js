const milkSaleSchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    accountNo: String,
    supplier: Number,
    name: Date,
    contact: Date,
    email: Date,
    address: Date,
    saleDate: Date,
    saleDate: Date,
    saleDate: Date,
    // Add other fields as needed
  });
  
  const MilkSale = mongoose.model('MilkSale', milkSaleSchema);