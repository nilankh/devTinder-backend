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
        }).populate("fromUserId", "firstName lastName");
        // }).populate("fromUserId", ["firstName","lastName"]); this is also possible, both is same


        res.json({"message":"Data fetched successfully!", "data":connectionRequest})
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id,status : "accepted"},
                {fromUserId: loggedInUser._id,status : "accepted"}
            ],
        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            // if(row.fromUserId.equals(loggedInUser._id)){
                return row.toUserId
            }
            return row.fromUserId
        });

        res.json({"message":"Data fetched successfully!", "data":data})

    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = userRouter;