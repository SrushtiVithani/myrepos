const express = require('express');
const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
  app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/dbase")
    .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));


  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,     
  gender: String,
    password: String
  })

  const User = mongoose.model("User",userSchema);

  app.post("/register",async(req,res)=>{
    const {name,email,phone,gender,password} = req.body;
    
    const hasspass = await bcrypt.hash(password,10);
    try{
        const user = await User.create({name,email,phone,gender,password:hasspass});
        res.json({ message: "User registered successfully", user });;
    }
    catch(err){
        res.json({error:"internal server error"});
    }
  })

  app.post("/login",async(req,res)=>{
    console.log("Login request email:", req.body.email);
    const {email,password} =req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"user not found"});
    }
    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid){
        return res.json({error:'invalid password'});
    }
    const token = jwt.sign({id:user._id},"secret123");
    res.json({token,name:user.name});
  })

app.listen(5000,()=>{
    console.log(`server start 5000`);
})
