const milkSaleSchema = new mongoose.Schema({
    id: String, // Custom id field
    userId: String,
    accountNo: String,
    supplier: String,
    name: Date,
    contact: Date,
    email: Date,
    address: Date,
    litre: Date,
    price: Date,
    due: Date,
    paid: Date,
    date: Date,
    soldBy: Date,
    invoice: Date,
    // Add other fields as needed
  });
  
  const MilkSale = mongoose.model('MilkSale', milkSaleSchema);