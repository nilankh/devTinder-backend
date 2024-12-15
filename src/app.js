const express = require("express");

// create new express application, instance of express
const app = express();

app.get("/getUserData",(req, res) => {
    // logic of db call and get some user data, suppose som eeroror happens, or you can use try and catch
    try {
        throw new Error("Nilank error")
        res.send("User Data sent!")
    } catch (error) {
        res.status(500).send("Something went wrong!!")
    }
   
})

//err should be the first parameter.
app.use("/", (err, req, res, next) => {
    if(err){
        // log your error message
        res.status(500).send("Something went wrong!!")
    }
})
app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});