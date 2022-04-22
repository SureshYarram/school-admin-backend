
const express = require("express");

const router = express.Router();

const Teacher = require("../Models/teachermodel")
router.post("/teacher",async(req,res)=>{

    try {
        const teacher = await Teacher.create(req.body);
        res.send(teacher)
    } catch (error) {
        res.send(error)
    }

})
router.get("/teacher",async(req,res)=>{
    // let sort = req.query.sort;
    // console.log(sort);
    // let gender= req.query.gender
    //  if(gender==""){
    //     var teacher = await Teacher.find().lean().exec();
    //     res.send(teacher)
    //  }
    //  else if(sort===0){
    //      teacher = await Teacher.find().lean().exec();
    //     res.send(teacher)
    //  }
    // var teacher ;
    //  if(req.query.gender==""&&req.query.sort==0){
    //   teacher = await Teacher.find().lean().exec();
    //   return res.send(teacher)
    //  }
    //  else if(req.query.gender==""){
    //      teacher = await Teacher.find().sort({Age:req.query.sort}).lean().exec();
    //      return res.send(teacher)
    //  }
    //  else if(req.query.sort==0){
    //     teacher = await Teacher.find({Gender:req.query.gender}).sort().lean().exec();
    //     return res.send(teacher)
    //  }
    const page = req.query.page || 1;
    const sor = req.query.sort;
    
     if(req.query.gender==""&&sor==0){
        var teacher = await Teacher.find().limit(4).skip((page-1)*4).lean().exec()
        return res.send(teacher)
     }
     else if(req.query.gender==""&&sor!==0){
        teacher = await Teacher.find().sort({Age:sor}).limit(4).skip((page-1)*4).lean().exec();
        return res.send(teacher)
     }
     else if(req.query.gender!==""&&sor==0){
        teacher = await Teacher.find({Gender:req.query.gender}).limit(4).skip((page-1)*4).lean().exec()
        return res.send(teacher)
     }
     else{
    try {
      teacher = await Teacher.find({Gender:req.query.gender}).sort({Age:sor}).limit(4).skip((page-1)*4).lean().exec();
        return res.send(teacher)
    } catch (error) {
        res.send(error)
    }
}  
})




router.get("/teacher/:id",async(req,res)=>{
  
        
          if(req.params.id==0){
            var teacher = await Teacher.find({Gender:req.query.gender}).lean().exec();
            res.send(teacher)
          }
    try { 
         teacher = await Teacher.find({Gender:req.query.gender}).sort({Age:req.params.id}).lean().exec();
        res.send(teacher)
    } catch (error) {
        res.send(error)
    }

})



module.exports = router;
