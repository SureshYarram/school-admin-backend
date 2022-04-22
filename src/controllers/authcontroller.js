require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../Models/usermodel");

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
  };


  const register = async(req,res)=>{
      try {
          
    let user = await User.findOne({email:req.body.email}).lean().exec();
    if(user){
         return res.status(500).send("try another email");
    }
        user = await User.create(req.body);

        const token = newToken(user);
        

        return res.send({user,token});

      } catch (error) {
          return res.send(error.message);
      }
  }


  const login = async(req,res)=>{
      try {
        
        let user = await User.findOne({email:req.body.email});

        if(!user){
          return   // return res.send("you entered wrong email or password");   
        }
        const match = user.checkPassword(req.body.password);

        if(!match){
           return  // return res.send("you entered wrong email or password");
           
        }
        const token = newToken(user);
        return res.send({user,token})
     
      } catch (error) {
        return res.send(error.message);
      }
  }
  module.exports = {register , login};