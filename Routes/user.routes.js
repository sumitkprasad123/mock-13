const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../model/user.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// user registration
userRouter.post("/register",(req,res) => {
    const {name,avatar,email,password} = req.body
   try{
       bcrypt.hash(password, 5, async(err, hash) => {
        let user = new UserModel({name,avatar,email,password:hash})
          await user.save()
          res.status(200).send({"msg":"Registed successfull"})
     });
   }catch(err){
           res.status(400).send({"msg":err.message})
   }
})

// user Login
userRouter.post("/login",async(req,res) => {
    const {email,password} = req.body
   try{
     let user = await UserModel.findOne({email})
     if(user){
        console.log(user)
        bcrypt.compare(password, user.password, (err, result) => {
           if(result){
             res.status(200).send({"msg":"Login Successfull",token:jwt.sign({ userID: user._id }, 'sumit')})
           }else{
              res.status(200).send({"msg":"wrong Credential"})
           }
        });
     }
   
   }catch(err){
           res.status(400).send({"msg":err.message})
   }
})


module.exports = {
    userRouter
}