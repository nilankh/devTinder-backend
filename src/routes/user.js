const express = require('express');
const userRouter = express.Router();


const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

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


userRouter.get("/feed", userAuth, async(req, res) => {
    try{
        // user can see all the users, exccept
        // 1. his own card.
        // 2. His connections.
        // 3. Ignored people.
        // 4. Already send the connection request.
        
        const loggedInUser = req.user;

        // find all the connection request(sent + received)
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        console.log('line 76', hideUsersFromFeed)

        const users = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUsersFromFeed)},},
                {_id: {$ne: loggedInUser._id}},
            ],
        }).select("firstName lastName photoUrl age gender about skills")

        console.log('line 82', users)

        res.json({"message":"Data fetched successfully!", "data":users})
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = userRouter;