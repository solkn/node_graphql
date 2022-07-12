const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  title:{ 
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  director:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Movie", MovieSchema);

