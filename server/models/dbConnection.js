const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
.then(()=>{
    console.log('Database connection successful!!!')
}).catch((err)=>{
    console.log('Error while mongoDB connection:',err)
})