const express = require('express');
const authRouter = express.Router();

const {validateSignUpData, ValidateLoginData} = require("../utils/validation")
const bcrypt = require("bcrypt");
const User = require("../models/user")


authRouter.post('/login', async(req, res) => {

    try{
        ValidateLoginData(req);
        const {emailId, password} = req.body;
        
        const user = await User.findOne({emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid){
            throw new Error("Invalid Credentials");
        }
        else {
            //  create a jwt token
            const token = await user.getJWT();
            console.log("token", token);

            // add the token to cookie and send the response back to the user
            res.cookie("token", token, {expires: new Date(Date.now() + 900000)});
            res.send("User successfully logged in");
        }


    }catch(err) {
        res.status(400).send("ERROR IN LOGIN: " + err.message);
    }
});

authRouter.post('/signup', async(req, res) => {
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

authRouter.post('/logout', async(req, res) => {
    // try{
    //     res.clearCookie("token");
    //     res.send("User successfully logged out");
    // }catch(err) {
    //     res.status(400).send("ERROR IN LOGOUT: " + err.message);
    // }

    res.cookie("token", null, {expires: new Date(Date.now())});
    res.send("User successfully logged out");
});

module.exports = authRouter;