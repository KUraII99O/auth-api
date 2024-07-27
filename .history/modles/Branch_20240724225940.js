const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    
    branchName: "",
    setupDate: "",
    builderName: "",
    phoneNumber: "",
    email: "",
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;