const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const { UserModel } = require('../models/usermodel');

const userRouter=express.Router();

userRouter.post('/register',async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            res.json("User already exist in our database");
        }
        bcrypt.hash(password,5,async function(err,hash){
            if(err){
                res.send('Something went wrong while hashing');
            }else{
                const user=new UserModel({username,email,password:hash});
                await user.save();
                res.json("\tRegistration successfully🥳🥳 \n New user has been created");
            }
        })
    } catch (error) {
        res.status(200).send('Error in registering the user');
    }
})


userRouter.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    const accessToken=jwt.sign({userID:user._id,user:user.username},process.env.ACCESS_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRATION});
                    res.status(200).send({'Message':"Login Successfully","AccessToken":accessToken});
                }else{
                    res.status(200).send({'Message':"Wrong Password"})
                }
            })
        }else{
            res.json({"Message":"User not found !!!"});
        }
    } catch (error) {
        res.status(400).send({"Error":error});
    }
})

module.exports={userRouter}