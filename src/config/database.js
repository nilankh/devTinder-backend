// mongodb+srv://nilanknikhilh:pYBxK5JP50aPdMoN@nodejsh.ynwav.mongodb.net/

const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://nilanknikhilh:pYBxK5JP50aPdMoN@nodejsh.ynwav.mongodb.net/devTinder")
}

module.exports = connectDB;

// connectDB().then(() => {
//     console.log("Database connection eastablished....")
// }).catch(err => {
//     console.log("Database can not be connected..")
// })

// here first we need to start the db server then only we have start the app srver