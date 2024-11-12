const mongoose = require("mongoose");
const InchargeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const InchargeModel = mongoose.model("studentsCollection", InchargeSchema);
module.exports = InchargeModel;
