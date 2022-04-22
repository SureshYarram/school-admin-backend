const mongoose = require("mongoose");



const teacherSchema = new mongoose.Schema({

    Name:{type:String, required:true},
    Gender:{type:String , required:true },
    Age:{type:String , required:true },
    Image:{type:String , required:true },
})

module.exports = mongoose.model("teacher" , teacherSchema)
  