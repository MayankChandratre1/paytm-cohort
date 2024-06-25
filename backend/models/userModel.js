const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://admin:mongodb2004@cluster0.ihwrfim.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        default:"user"
    },
    lastName:{
        type:String,
        required:true,
        default:""
    },
    username:{
        type:String,
        unique:true,
        required:true,
        default:""
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        default:"123456"
    },
})

const userModel = mongoose.model("User", userSchema)

module.exports = {userModel}