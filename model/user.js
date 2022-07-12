var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    

});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
  });
  
  userSchema.methods.verifyPassword = async function (
    canidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(canidatePassword, userPassword);
  };

const User = mongoose.model("User",userSchema);

module.exports = User;