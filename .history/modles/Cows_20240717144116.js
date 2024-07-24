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
  milkPerDay: { type: Number, required: true },
  animalStatus: { type: String, required: true },
  gender: { type: String, required: true },
  stallNumber: { type: Number, required: true },
  dateOfBirth: { type: Boolean, default: true },
  animalAgeDays: { type: Date, default: Date.now },
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  image: { type: String, required: true },
  animalType: { type: String, required: true },
  buyDate: { type: Number, required: true },
  buyingPrice: { type: Boolean, default: true },
  dateAdded: { type: Date, default: Date.now },
  pregnantStatus: { type: Number, required: true, unique: true },
  milkPerDay: { type: Number, required: true },
  animalStatus: { type: String, required: true },
  gender: { type: String, required: true },
  stallNumber: { type: Number, required: true },
  dateOfBirth: { type: Boolean, default: true },
  animalAgeDays: { type: Date, default: Date.now },
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;