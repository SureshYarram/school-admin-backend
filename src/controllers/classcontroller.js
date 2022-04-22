const express = require("express");

const router = express.Router();

const Class = require("../Models/classmodel")
router.post("/class",async(req,res)=>{

    try {
        const subject = await Class.create(req.body);
        res.send(subject)
    } catch (error) {
        res.send(error)
    }

})
router.get("/class",async(req,res)=>{

    try {
        const subject = await Class.find().populate("teacher_id").lean().exec();
        res.send(subject)
    } catch (error) {
        res.send(error)
    }

})
router.get("/class/:id",async(req,res)=>{
          console.log(req.params.id)
    try {
        const subject = await Class.find({teacher_id:req.params.id}).populate("teacher_id").lean().exec();
        console.log(subject.length)
        res.send(subject)
    } catch (error) {
        res.send(error.message)
    }

})

module.exports = router;