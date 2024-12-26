const mongoose = require('mongoose');
const { useFormStatus } = require('react-dom');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 100,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password: {
        type: String,
        required:true,
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
        default:"https://www.opi.net/wp-content/uploads/2018/06/dummy-member.jpg"
    },
    about: {
        type: String,
        default:"Hey there! I am using DevTinder"
    },
    skills: {
        type: [String],
    },
})

// creating a model
const User = mongoose.model("User", userSchema);

module.exports = User;