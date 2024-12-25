const express = require("express");
const connectDB = require("./config/database")
// require("./config/database")
// create new express application, instance of express
const app = express();
const User = require("./models/user")

// now this middleware will be active for all the routes
app.use(express.json());

app.post('/signup', async(req, res) => {

    // it will be undefined, reason is our server is not able to read the json data, to read the json data we need a middleware which can check the incoming request and parse the json data
    console.log("req", req.body)
    // const userObj = {
    //     firstName: "Neel",
    //     lastName: "Punj",
    //     emailId: "punjneel@gmail.com",
    //     password: "Nilank@123"
    // }
    // try{
    //     // creating new Instance of User model
    //     const user = new User(userObj);
    //     // it returns a promises so we need to await
    //     await user.save();
    //     res.send("User successfully created!");
    // } catch(err) {
    //     res.status(400).send("Error saving the user: ",err.message);
    // }
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
