// mongodb+srv://nilanknikhilh:pYBxK5JP50aPdMoN@nodejsh.ynwav.mongodb.net/

const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://nilanknikhilh:pYBxK5JP50aPdMoN@nodejsh.ynwav.mongodb.net/devTinder")
}

connectDB().then(() => {
    console.log("Database connection eastablished....")
}).catch(err => {
    console.log("Database can not be connected..")
})