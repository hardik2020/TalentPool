const mongoose=require("mongoose");

// mongoose.connect("mongodb://localhost:27017/userRegistration",
// {
//   useCreateIndex:true,
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// }).then(()=>{
//   console.log("connection sucessful....");
// }).catch((err)=>{
//   console.log("connection failed....");
// })

const db=`mongodb+srv://user:talentpool108@cluster0.wknbd.mongodb.net/user?retryWrites=true&w=majority`;
mongoose.connect(db,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
  console.log("online connection Successful...");
}).catch((err)=>{
  console.log("online connection faild....");
})