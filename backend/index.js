
const express = require("express");
const { router } = require("./routes/index");
const cors = require("cors")

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(port, (err)=>{
    console.log("Listening to 3000");
})