const express = require('express');
const userRouter = express.Router();


const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")

// Get all the pending connection request for the loggedIn User
userRouter.get("/user/connections/received", userAuth,async(req, res) => {
    
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status : "interested"
        });
        res.json({"message":"Data fetched successfully!", "data":connectionRequest})
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})


module.exports = userRouter;