const express = require("express");
require("./config/database")
// create new express application, instance of express
const app = express();





app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});