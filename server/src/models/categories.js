require("dotenv").config();
const mongoose=require("mongoose");

const categSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  
  
})


const Categories=new mongoose.model("Categories",categSchema);

module.exports=Categories;