const express = require('express');
const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");


profileRouter.get('/profile', userAuth,async(req, res) => {

    try{
        res.send(req.user);
    }catch(err) {
        res.status(401).send("ERROR IN PROFILE: " + err.message);
    }
});

module.exports = profileRouter;