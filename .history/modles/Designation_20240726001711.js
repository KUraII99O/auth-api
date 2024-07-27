const mongoose = require('mongoose');

// Define the schema for UserType
const DesignationSchema = new mongoose.Schema({
  typeName: { type: String, required: true },
  id: { type: String, required: true },
  userId: { type: String, required: true },

  permissions: {
    cow: {
      viewCowList: { type: Boolean, default: false },
      cowEntryForm: { type: Boolean, default: false },
      cowSaveAccess: { type: Boolean, default: false },
      cowEditForm: { type: Boolean, default: false },
      cowUpdateAccess: { type: Boolean, default: false },
      cowDeleteAccess: { type: Boolean, default: false },
    },
    animalType: {
      viewAnimalTypeList: { type: Boolean, default: false },
      animalTypeSaveAccess: { type: Boolean, default: false },
      animalTypeUpdateAccess: { type: Boolean, default: false },
      animalTypeDeleteAccess: { type: Boolean, default: false },
    },
    branch: {
      viewBranchList: { type: Boolean, default: false },
      branchSaveAccess: { type: Boolean, default: false },
      branchUpdateAccess: { type: Boolean, default: false },
      branchDeleteAccess: { type: Boolean, default: false },
      branchUpdateStatusAccess: { type: Boolean, default: false },
    },
    // Add other categories similarly...
  },
});

const Designation = mongoose.model('Designation', DesignationSchema);
module.exports = Designation;
