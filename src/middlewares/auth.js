const jwt = require('jsonwebtoken');
const User = require("../models/user");

const adminAuth = (req, res, next) => {
    console.log("admiin auth is getting checked!")
    const token  = "xyz"
    const isAdminAuthorized = token === "xyz"
    if (!isAdminAuthorized){
        res.status(401).send("Unauthorized request!")
    }else {
        next();
    }
}

const userAuth = async (req, res, next) => {
    try{
        // read the token from the req cookies
        const {token} = req.cookies
        if (!token){
            throw new Error("Unauthorized request");
        }

        const decodeObj = await jwt.verify(token, "dskjfdffkdsjfkdsfncsxcnz");

        const {_id} = decodeObj;

        const user = await User.findById(_id);
        if (!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(401).send("Error: " + err.message);
    }
}

module.exports = {
    adminAuth,
    userAuth,
}