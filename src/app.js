const express = require("express");

// create new express application, instance of express
const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully!!")
})


// app.use("/user", userAuth) or we can write in a different way
app.get("/user", userAuth, (req, res) => {
    res.send("User Data sent!")
})

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