// models/userType.js
const mongoose = require('mongoose');

// Define the schema for UserType
const UserTypeSchema = new Schema({
  typeName: String,
  id: String, // Ensure id is a string
  userId: String,

  permissions: {
    cow: {
      viewCowList: Boolean,
      cowEntryForm: Boolean,
      cowSaveAccess: Boolean,
      cowEditForm: Boolean,
      cowUpdateAccess: Boolean,
      cowDeleteAccess: Boolean,
    },
    animalType: {
      viewAnimalTypeList: Boolean,
      animalTypeSaveAccess: Boolean,
      animalTypeUpdateAccess: Boolean,
      animalTypeDeleteAccess: Boolean,
    },
    branch: {
      viewBranchList: Boolean,
      branchSaveAccess: Boolean,
      branchUpdateAccess: Boolean,
      branchDeleteAccess: Boolean,
      branchUpdateStatusAccess: Boolean,
    },
    // Add other categories similarly...
  },
});

const UserType = mongoose.model('UserType', UserTypeSchema);
module.exports = UserType;
