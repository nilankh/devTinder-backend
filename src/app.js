const express = require("express");

// create new express application, instance of express
const app = express();


// this means b is optional
// app.get("/ab?c", (req, res) => {
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// it means you can add as many b as you can /abbbbbbc, /abc,abbbc all will work.
// app.get("/ab?c", (req, res) => {
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// This means, if you write ab and then anything in between ad towards the end you write cd it will give you the result.
// app.get("/ab*cd", (req, res) => {
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// This means bc is optional, /abcd,/ad
// app.get("/a(bc)?d", (req, res) => {
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// this means anything in url if a is there it will work
// app.get(/a/, (req, res) => {
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// anything ending with fly will work
// app.get(/.*fly$/, (req, res) => {
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// query_params
// app.get("/user/", (req, res) => {
//     console.log('req', req.query)
//     res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
// })

// path params
app.get("/user/:userId", (req, res) => {
    console.log('req', req.params)
    res.send({"firstName":"Nilank", "lastName":"NIKHIL"})
})




app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});