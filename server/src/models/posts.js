require("dotenv").config();
const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
  
    date:{
        type:Date,
        required:true
      },
      user:{
        type:String,
        required:true
      },
      type:{
        type:String,
        required:true
      },
      caption:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      },
      score:{
        type:Number,
        required:true,
        default:0
      },
      votes:[{
        id:{
          type:String,
          required:true
        },
        vote:{
          type:Number,
          required:true
        }
      }],
      category:{
          type:String,
          required:true
      }

})


const Posts=new mongoose.model("Posts",PostSchema);

module.exports=Posts;