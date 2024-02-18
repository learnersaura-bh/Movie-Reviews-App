const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email:{
    type : String,
    unique: true,
    required: true
  },
  password : {
    type : String,
    required : true
  },
  profilePictureUrl : {
    type : String
  },
  username : {
    type: String,
    unique : true,
    required : true
  },
  phoneNumber : Number
},{
  timestamps : true
})

const Assignment_15_User = mongoose.model("Assignment_15_User" , userSchema)

module.exports = Assignment_15_User;