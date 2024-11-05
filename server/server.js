const express = require('express');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin :["http://localhost:5173"]
}
app.use(cors(corsOptions))
require('dotenv').config();


const mongodb = require('mongodb').MongoClient;

let stinnovationDB;
mongodb.connect(process.env.DB_URL)
  .then(client => {
    stinnovationDB = client.db('moviedb');
    students = stinnovationDB.collection('students');
    app.set('students', students);
    console.log("DB connection successful!!!");
  })
  .catch(err => console.log("Error in DB", err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
