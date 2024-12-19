const express = require("express");
const connectDB = require("./config/database")
require("./config/database")
// create new express application, instance of express
const app = express();



connectDB().then(() => {
    console.log("Database connection eastablished....")
    app.listen(3000, ()=> {
        console.log("Server is successfully listenting..");
    });
}).catch(err => {
    console.log("Database can not be connected..")
})

// app.listen(3000, ()=> {
//     console.log("Server is successfully listenting..");
// });

// write way is first connect way to db then start the server
