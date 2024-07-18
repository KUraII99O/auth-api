const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  image: { type: String, required: true },
  animalType: { type: String, required: true },
  buyDate: { type: Number, required: true },
  buyingPrice: { type: Boolean, default: true },
  dateAdded: { type: Date, default: Date.now },
  pregnantStatus: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: Boolean, default: true },
  dateAdded: { type: Date, default: Date.now },
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;