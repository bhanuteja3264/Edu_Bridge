const mongoose = require("mongoose");
const GuideSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const GuideModel = mongoose.model("studentsCollection", GuideSchema);
module.exports = GuideModel;
