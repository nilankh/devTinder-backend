const express = require('express');
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");


requestRouter.post("/sendConnectionRquest", userAuth,async(req, res) => {
    // send a connection request to the user
    console.log("send a connection request to the user");

    res.send("Connection request sent successfully");
});

module.exports = requestRouter;