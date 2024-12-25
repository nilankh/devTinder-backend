const express = require("express");
const connectDB = require("./config/database")
// require("./config/database")
// create new express application, instance of express
const app = express();
const User = require("./models/user")
console.log("fszd",User)

app.post('/signup', async(req, res) => {
    const userObj = {
        firstName: "Harshita",
        lastName: "Annadanapu",
        emailId: "harshita@gmail.com",
        password: "Nilank@123"
    }
    try{
        // creating new Instance of User model
        const user = new User(userObj);
        // it returns a promises so we need to await
        await user.save();
        res.send("User successfully created!");
    } catch(err) {
        res.status(400).send("Error saving the user: ",err.message);
    }
});


connectDB().then(() => {
    console.log("Database connection eastablished....")
    app.listen(3000, ()=> {
        console.log("Server is successfully listenting..");
    });
}).catch(err => {
    console.log("Database can not be connected..")
})

// app.listen(3000, ()=> {
//     console.log("Server is successfully listenting..");
// });

// right way is first connect way to db then start the server
