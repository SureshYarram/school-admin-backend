const express = require("express");
const cors = require("cors")
const app = express();
require("dotenv").config()
app.use(express.json());

app.use(cors());
const PORT = process.env.PORT
const connect = require("./config/db");


const teacherControoler = require("./controllers/teachercontroller");
const classControoler = require("./controllers/classcontroller");

const {register , login} = require("./controllers/authcontroller")
app.use("/",teacherControoler)
app.use("/",classControoler)
app.use("/signup",register);
app.use("/login",login);
app.listen(PORT,async()=>{
    try {
        await connect();
        console.log("listening port 8080")
    } catch (e) {
        console.log(e.message)
    }
})
