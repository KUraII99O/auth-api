const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  id:  String,  
  name:  String,
  userId: String,


});

const FoodItem  = mongoose.model("FoodItem ", FoodItemSchema);

module.exports = FoodItem;
