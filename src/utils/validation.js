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
module.exports = {validateSignUpData, ValidateLoginData};