
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PW}@nodejsh.ynwav.mongodb.net/devTinder`)
}

module.exports = connectDB;

// connectDB().then(() => {
//     console.log("Database connection eastablished....")
// }).catch(err => {
//     console.log("Database can not be connected..")
// })

// here first we need to start the db server then only we have start the app srver