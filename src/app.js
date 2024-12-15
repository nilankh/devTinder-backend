const express = require("express");

// create new express application, instance of express
const app = express();

// if you want to "use", then all the api's starting with use will be go through this middleware, if you only want get, then you can use like app.get("/admin")
// Handle Auth middleware for all request
app.use("/admin", (req, res, next) => {
    console.log("admiin auth is getting checked!")
    const token  = "xyz"
    const isAdminAuthorized = token === "xyz"
    if (!isAdminAuthorized){
        res.status(401).send("Unauthorized request!")
    }else {
        next();
    }
})


// why do we need middlware
// app.get('/admin/getAllData', (req,res) => {
//     // check if the request is actually made by admin or is it authorized or not


//     // don't you think you  need to write this again and again
//     const token  = "xyz"
//     const isAdminAuthorized = token === "xyz"
//     if (isAdminAuthorized){
//         // logic of fetching all the data
//         res.send("All Data sent")
//     }else {
//         res.status(401).send("Unauthorized!")
//     }
//     // now think you need to put this authorization to all the admin api's, do you want to write again and again?
//     // No right, this is where middleware comes into the picture
// })

// app.get('/admin/deleteUser', (req,res) => {


//     // logic of deleting the user
//     res.send("User is deleted")
// })



//after makoign middleware we can directly send the response back
app.get("/admin/getAllData", (req, res) => {
    res.send("All Data sent!")
})

app.get('/admin/deleteUser', (req,res) => {
    res.send("User is deleted")
})


app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});