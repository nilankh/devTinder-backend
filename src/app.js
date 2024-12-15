const express = require("express");

// create new express application, instance of express
const app = express();

// what will happen when nothing will be return will be return from api, it will be timeout
// app.use("/user", (req, res) => {
    // Route Handler
//     // res.send("route Handler 1")
// })

// // one route can have multiple route handler
// // next is given by express.js
// app.use("/user", (req, res, next) => {
//     // res.send("route Handler 1")
//     next();
// }, (req, res) => {
//     // route handler 2
//     res.send("route handler 2")
// })
// otuput is route handler 2


// // one route can have multiple route handler
// // next is given by express.js
// app.use("/user", (req, res, next) => {
//     res.send("route Handler 1")
//     next();
// }, (req, res) => {
//     // route handler 2
//     res.send("route handler 2")
// })
// output is router haandler1 WE SHOULD NEVER WRITE LIKE THIS


// one route can have multiple route handler
// next is given by express.js
// app.use("/user", (req, res, next) => {
//     next();
//     res.send("route Handler 1")
    
// }, (req, res) => {
//     // route handler 2
//     res.send("route handler 2")
// })
// // OUTPUT IS ROUTE HANDLER 2


// app.use("/user", (req, res, next) => {
//     console.log("Handling the route user 1")
//     // res.send("route Handler 1")
//     next();
    
// }, (req, res, next) => {
//     // route handler 2
//     // res.send("route handler 2")
//     console.log("Handling the route user 2")
//     next();
// },  (req, res, next) => {
//     // route handler 2
//     // res.send("route handler 3")
//     console.log("Handling the route user 3")
//     next();
// }, (req, res, next) => {
//     // route handler 2
//     // res.send("route handler 4")
//     console.log("Handling the route user 4")
//     next();
// });
// // OUTPUT IS nothing



// you can wrap also inside the array
app.use("/user", 
[(req, res, next) => {
    console.log("Handling the route user 1")
    // res.send("route Handler 1")
    next();
    
}, 
(req, res, next) => {
    // route handler 2
    // res.send("route handler 2")
    console.log("Handling the route user 2")
    next();
},  
(req, res, next) => {
    // route handler 2
    // res.send("route handler 3")
    console.log("Handling the route user 3")
    next();
}, 
(req, res, next) => {
    // route handler 2
    // res.send("route handler 4")
    console.log("Handling the route user 4")
    next();
},(req, res, next) => {
    // route handler 2
    console.log("Handling the route user 5")
    res.send("route handler 5")
    
    
}]);
// OUTPUT IS ROUTE HANDLER 2




app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});