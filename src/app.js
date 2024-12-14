const express = require("express");

// create new express application, instance of express
const app = express();


// req /user, /user/xyz, /user/1
app.get("/user", (req, res) => {
    res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
})



app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});