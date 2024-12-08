const express = require("express");

// create new express application, instance of express

const app = express();

app.use("/test",(req, res) => {
    res.send("Hello from the server");
})


app.listen(3000, ()=> {
    console.log("Server is successfully listenting..");
});