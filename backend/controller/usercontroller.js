const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user')
const Message = require('../model/message')
const mongoose = require('mongoose');
const db = mongoose.connection;
const collection = db.collection('users');
module.exports = {
  loginUser: async (req, res) => {
    try {
      const usercheck = await user.findOne({ email: req.body.email })
      if (!usercheck) {
        return res.status(400).json({ error: "Invalid username" });
      }
      else {
        const passwordmatch = await bcrypt.compare(req.body.password, usercheck.password)
        if (passwordmatch) {
          const token = jwt.sign({ email: usercheck.email }, 'rasi_secret_key', { expiresIn: '1h' });
          if (usercheck.role == 'admin') {
            return res.json({ token, success: "admin", user: "Admin" });
          } else if (usercheck.status == "block") {
            return res.status(400).json({ token, error: "Admin blocked" });
          }
          else
            return res.json({ token, success: "success", user: usercheck.name });
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
    const existuser = await user.findOne({ email: datas.email })
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
  updateUser: async (req, res) => {
    const result = await user.findOneAndUpdate({ email: req.body.data.email }, req.body.data)
    return res.status(200).json({ user: "sucess" });
  },
  deleteUser: async (req, res) => {
    const result = await user.deleteOne({ email: req.body.email })
    return res.status(200).json({ user: "sucess" });
  },
  getUser: async (req, res) => {
    let query = {};
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = { name: { $regex: searchRegex } };
    }
    const data = await user.find(query)
    return res.status(200).json({ data: data });
  },
  getUserid: async (req, res) => {
    const id = req.params.id
    const data = await user.findOne({ email: id }, { _id: 0, email: 1, name: 1, address: 1, dob: 1 })
    return res.status(200).json({ data: data });
  },
  updateProfile: async (req, res) => {
    console.log(req.body);
  },
  home: async (req, res) => {
    return res.status(200).json({ user: "sucess" });
  },
  message: async (data) => {
    const proid = data.sender;
    const userd = await user.findOne({ name: proid });
    const userId1 = userd._id;
    const datas = {
      userId: userId1,
      content: data.content,
    }
    const result=await Message.create(datas)
   
  },

  message_get: async (req, res) => {
    var proid = req.user.email;
    const userd = await user.findOne({ email: proid });
    const user1 = userd._id;
    try {
      const messages = await Message.find({ userId: user1 })
        .sort({ timestamp: 1 })
        .select({ content: 1, _id: 0 });
      console.log(messages);
      res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching messages" });
    }
  },
}