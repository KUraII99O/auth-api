const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  id: { type: String },
  userId: { type: String,  },
  image: { type: String,  },
  animal: { type: String,  },
  buyDate: { type: String,  },
  buyingPrice: { type: Number,  },
  dateAdded: { type: Date, },
  pregnantStatus: { type: String,  },
  milkPerDay: { type: String,  },
  animalStatus: { type: Boolean,  },
  gender: { type: String,  },
  stallNumber: { type: String,  },
  dateOfBirth: { type: Date,  },
  animalAgeDays: { type: Number,  },
  weight: { type: String,  },
  height: { type: String,  },
  color: { type: String,  },
  numOfPregnant: { type: String,  },
  nextPregnancyApproxTime: { type: String,  },
  buyFrom: { type: String,  },
  prevVaccineDone: { type: String,  },
  note: { type: String,  },
  createdBy: { type: String,  },
  BDV: { type: Boolean,  },
  PI3: { type: Boolean,  },
  BRSV: { type: Boolean,  },
  BVD: { type: Boolean,  },
  VitaminA: { type: Boolean,  },
  Anthrax: { type: Boolean,  },
});

const Cow = mongoose.model("Cow", cowSchema);

module.exports = Cow;
