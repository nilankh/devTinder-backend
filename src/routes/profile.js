const express = require('express');
const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const {validateProfileEditData} = require("../utils/validation");

profileRouter.get('/profile', userAuth,async(req, res) => {

    try{
        res.send(req.user);
    }catch(err) {
        res.status(401).send("ERROR IN PROFILE: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
        if(!validateProfileEditData(req)){
            throw new Error("Invalid Edit Request");
        }

        const user = req.user;
        
        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
        await user.save();
        res.json({"message":"Profile Updated Successfully","data":user});
    }catch(err){
        res.status(400).send("Error in profile edit: " + err.message);
    }
});

// change password
profileRouter.patch("/profile/change-password",async(req, res) => {

})
module.exports = profileRouter;