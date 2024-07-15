const milkSaleSchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    milkId: String,
    quantity: Number,
    saleDate: Date,
    saleDate: Date,
    saleDate: Date,
    saleDate: Date,
    saleDate: Date,
    saleDate: Date,
    saleDate: Date,
    // Add other fields as needed
  });
  
  const MilkSale = mongoose.model('MilkSale', milkSaleSchema);