const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    minlength: [3, "username must be at least 3 characters long"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    validate: {
      validator: function(v){
        return /^[a-zA-Z0-9-_.]*@{1}([a-zA-Z]*\.){1,2}[a-z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email`,
      isAsync: false
    }
  },
  password: {
    type:String,
    required: [true, "password is required"],
    minlength: [6, "password must be at least 6 characters long"]
  }
}, {
  timestamps:true,
})

const User = mongoose.model("User", UserSchema);

module.exports = User;

//added . to first part of email validation regex
