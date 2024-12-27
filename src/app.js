const express = require("express");
const validator = require("validator");
const connectDB = require("./config/database")
// require("./config/database")
// create new express application, instance of express
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");

// now this middleware will be active for all the routes
app.use(express.json());

app.post('/signup', async(req, res) => {
    try{
        // validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password, gender, skills} = req.body;
        
        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash,
            gender,
            skills
        });
        
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
        const ALLOWED_UPDATES = ["firstName", "lastName",  "password","photoUrl", "about", "skills"];

        const isUpdateAllowed = Object.keys(req.body).every(update => ALLOWED_UPDATES.includes(update));

        if(!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        if (req.body.skills?.length > 10){
            throw new Error("Skills can not be more than 10");
        }
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
