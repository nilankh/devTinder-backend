const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 100,
    },
    lastName: {
        type: String,
        minLength: 4,
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required:true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong");
            }   
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {   // custom validation
            if(!["male","female","others"].includes(value.toLowerCase())) {
                throw new Error("Gender data is not a valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default:"https://www.opi.net/wp-content/uploads/2018/06/dummy-member.jpg",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("URL is not valid");
            }
        }
    },
    about: {
        type: String,
        maxLength: 200,
        default:"Hey there! I am using DevTinder",
    },
    skills: {
        type: [String],
    },
}, {timestamps: true});


userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "dskjfdffkdsjfkdsfncsxcnz");
    return token;
}   

userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    return isPasswordValid;
}   

// creating a model
const User = mongoose.model("User", userSchema);

module.exports = User;
