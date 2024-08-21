const mongoose = require("mongoose");

const FoodUnitSchema = new mongoose.Schema({
  id:  String,  
  name:  String,
  userId: String,


});

const FoodUnit  = mongoose.model("FoodUnit ", FoodUnitSchema);

module.exports = FoodUnit;
