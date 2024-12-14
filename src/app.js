const express = require("express");

// create new express application, instance of express

const app = express();

// order of the router matters

// if line 9 "/" we are uncommeting and callingthen why /nilank or /test is not working, reason is we have associated / with the  the given data
// app.use("/",(req, res) => {
//     res.send("Hello from the server");
// })

app.use("/user", (req, res) => {
    res.send("HHAHAHAHHAHH")
})

// THis will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
})

app.post("/user", (req, res) => {
    // assume saving it to db
    res.send("Data Successfully save to the database.")
})

// this will match all the HTTP method API calls to /test
app.use("/test",(req, res) => {
    res.send("Hello from test");
})

// app.use("/test/2",(req, res) => {
//     // this will not work, because /test is already defined, so whenever /test will hit, it will redirect to aboeve line
//     res.send("Hello from test2");
// })

// app.use("/nilank",(req, res) => {
//     res.send("Hello from the nilank");
// })

// app.use("/",(req, res) => {
//     res.send("Hello from the server");
// })

app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});