const mongoose = require('mongoose');

// Define the schema for UserType
const UserTypeSchema = new mongoose.Schema({
  typeName: { type: String,  },
  id: { type: String,  },
  userId: { type: String,  },

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

const UserType = mongoose.model('UserType', UserTypeSchema);
module.exports = UserType;
