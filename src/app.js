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
    // console.log("req", req.body)
    // const userObj = {
    //     firstName: "Neel",
    //     lastName: "Punj",
    //     emailId: "punjneel@gmail.com",
    //     password: "Nilank@123"
    // }

    const user = new User(req.body);
   
    try{
        // creating new Instance of User model
        // const user = new User(userObj);
        // it returns a promises so we need to await
        await user.save();
        res.status(201).send("User successfully created!");
    } catch(err) {
        res.status(400).send("USER CREATION FAILED: " + err.message);
    }
});

// get user by email
app.get('/users/:email', async(req, res) => {
    
    try{
        // const user = await User.find({emailId: req.params.email});
        // if(user.length === 0) {
        //     res.status(404).send("User not found");
        // } else {
        //     res.send(user);
        // }
        const user = await User.findOne({emailId: req.params.email});
        if(!user) {
            res.status(404).send("User not found");
        }else {
            res.send(user)
        }
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// get all the users
app.get('/users', async(req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
});

app.delete('/users/:id', async(req, res) => {
    try{
        // const userId = await User.findByIdAndDelete(req.params.id);
        const userId = await User.findByIdAndDelete({"_id":req.params.id});
        
        if(!userId) {
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }
    }catch(err) {
        console.log(err.message);
        res.status(400).send("Something went wrong");
    }
});

app.patch('/users/:id', async(req, res) => {
    try{
        const userId = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {returnDocument:"before",runValidators:true});
        console.log("userId", userId);
        if(!userId) {
            res.status(404).send("User not found");
        } else {
            res.send("User updated successfully");
        }
    }catch(err) {
        res.status(400).send("UPDATE FAILED: " + err.message);
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
