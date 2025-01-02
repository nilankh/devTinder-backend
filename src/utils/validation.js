const validator = require('validator');

const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password, skills, gender} = req.body;

    if(!firstName || !lastName) {
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a strong Password");
    }
    else if (skills?.length > 10){
        throw new Error("Skills can not be more than 10");
    }
    else if (gender && !["male", "female", "others"].includes(gender.toLowerCase())){
        throw new  Error("Please Select a valid gender");
    }

}

const ValidateLoginData = (req) => {
    const {emailId, password} = req.body;

    if(!emailId || !validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if(!password) {
        throw new Error("Please Enter a Password");
    }
}


const validateProfileEditData = (req) => {

    const {firstName, lastName, about, gender,photoUrl, skills, age} = req.body;

    if(age && (age < 0 || age > 100)){
        throw new Error("Invalid Age");
    }

    if(!firstName  || !validator.isAlpha(firstName) || firstName.length > 40 || firstName.length < 3){
        throw new Error("First Name is not valid");
    }

    if(!lastName  || !validator.isAlpha(lastName) || lastName.length > 40 || lastName.length < 3){
        throw new Error("Last Name is not valid");
    }
    
    if (gender && !["male", "female", "others"].includes(gender.toLowerCase())){
        throw new  Error("Please Select a valid gender");
    }
    const allowedEditFields = ["firstName", "lastName", "about", "gender","photoUrl", "skills", "age"];
    
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));



    return isEditAllowed
}

module.exports = {validateSignUpData, ValidateLoginData, validateProfileEditData};