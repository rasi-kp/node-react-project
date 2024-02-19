const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const user=require('../model/user')
const mongoose = require('mongoose');
const db = mongoose.connection;
const collection = db.collection('users');
module.exports={
    loginUser: async (req, res) => {
        try {
          const usercheck = await user.findOne({email:req.body.email})
          if (!usercheck) {
            return res.status(400).json({ error: "Invalid username" });
          }
          else {
            const passwordmatch = await bcrypt.compare(req.body.password, usercheck.password)
            if (passwordmatch) {
                const token = jwt.sign({ email: usercheck.email}, 'rasi_secret_key', { expiresIn: '1h' });
              if (usercheck.role == 'admin') {
                return res.json({token, success: "admin" });
              } else if (usercheck.status == "block") {
                return res.status(400).json({token, error: "Admin blocked" });
              }
              else
                return res.json({token, success: "success",user:usercheck.name});
            }
            else {
              return res.status(400).json({ error: "Invalid password" });
            }
          }
        } catch {
          return res.status(500).json({ error: "Internal server error" });
        }
      },
    createUser: async (req, res) => {
        const datas = {
          role: "user",
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        }
        const existuser = await user.findOne({email:datas.email})
        if (/\s/.test(datas.username)) {
          return res.status(400).json({ error: "Space not allowed" });
        }
        else if (existuser) {
          return res.status(400).json({ error: "Email Already Exist" });
        }
        else {
          const saltRounds = 10;
          const hashpassword = await bcrypt.hash(req.body.password, saltRounds)
          datas.password = hashpassword
          const result = await collection.insertOne(datas)
          return res.status(200).json({ user: datas.name });
        }
      },
    updateUser:async(req,res)=>{
        console.log(req.body);
        const result=await user.findOneAndUpdate({email:req.body.data.email},req.body.data)
        return res.status(200).json({ user: "sucess" });
    },
    deleteUser:async(req,res)=>{
        console.log(req.body);
        const result=await user.deleteOne({email:req.body.email})
        console.log(result);
        return res.status(200).json({ user: "sucess" });
    },
    logoutUser:async(req,res)=>{
        console.log(req.body);
        
    },
    getUser:async(req,res)=>{
        let query = {};
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = { name: { $regex: searchRegex } };
        }
        const data=await user.find(query)
        return res.status(200).json({ data:data });
    },
    getUserid:async(req,res)=>{
        const id=req.params.id
        const data=await user.findOne({email:id})
        return res.status(200).json({ data:data });
    },
    updateProfile:async(req,res)=>{
        console.log(req.body);
    },
}