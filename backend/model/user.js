const mongoose=require('mongoose')

const signup = new mongoose.Schema({
    role: String,
    login: String,
    image: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    address:String,
    dob:String
})
const signupdata = new mongoose.model("users", signup)


module.exports = signupdata;