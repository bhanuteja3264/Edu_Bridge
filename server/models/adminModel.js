const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const AdminModel = mongoose.model("studentsCollection", AdminSchema);
module.exports = AdminModel;
