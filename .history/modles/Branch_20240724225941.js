const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    id:  String,  
  name:  String,
  userId: String,
    branchName: "",
    setupDate: "",
    builderName: "",
    phoneNumber: "",
    email: "",
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;