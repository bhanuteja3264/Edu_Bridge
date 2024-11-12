const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
require("dotenv").config();
require("./models/dbConnection");

const PORT = 1544;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
