const express=require("express");
const path=require("path");
require("dotenv").config();

const bcrypt=require("bcryptjs");
const cookieParser=require("cookie-parser");
const app=express();
const port=process.env.PORT || 5000;
const authentication=require("./middleware/authentication");
const nodemailer = require("nodemailer");
const jwt=require("jsonwebtoken");

require("./db/connection");
const Register=require("./models/registers");
const Posts=require("./models/posts");
const Categories=require("./models/categories")

app.use(cookieParser());

const {cloudinary} = require('./utils/cloudinary');

app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({extended:false}));



app.post("/categories",async(req,res)=>{
  try
  {
    const data = await Categories.find();
    var arr = [];
    for(var i=0;i<data.length;i++)
    {
      arr = arr.concat(data[i].name);
    }
    res.status(201).json({status:201,arr:arr});
  }
  catch(err)
  {
    res.status(201).json({status:400});
  }
})


app.post("/handleVote",async(req,res)=>{
  try{
    console.log("at server");
    const userId = req.body.userId;
    const postId = req.body.postId;
    const vote = req.body.vote;
    const postUserId = req.body.postUserId;
    
    const posts = await Posts.findOne({_id:postId});
    
    var n = posts.votes.length;
    var idx2=-1;
    for(var i=0;i<n;i++)
    {
      if(posts.votes[i].id==userId)
      {
        idx2=i;
        break;
      }
    }
    if(idx2==-1)
    {
      posts.votes = posts.votes.concat({id:userId,vote:vote});
    }
    else
    {
      posts.votes[idx2].vote = vote;
    }
    console.log(posts.score);
    posts.score += vote
    console.log(posts.score);
    
    await posts.save();
    res.status(201).json({status:201,data:posts});
  }
  catch(err)
  {
    console.log(err);
    res.status(201).json({status:400});
  }
})

app.post("/getProfile",async(req,res)=>{
  try{
    const username = req.body.username;
    const data = await Register.findOne({username:username});
    const posts = await Posts.find({user:data.email}).sort({'date': -1}).skip((req.body.page-1)*req.body.limit).limit(req.body.limit);;

    var posts1 = [];
    
    let flag=true;
    let name = data.fname+" "+data.lname;
    let photo = data.image;
    let postUserId = data._id;
    
    if(flag)
    {
      for(let j=0;j<posts.length;j++)
      {
        console.log("inside loop");
        let obj = posts[j];
        let obj1={
          _id: obj._id,
          username:username,
          date: obj.date,
          caption: obj.caption,
          type: obj.type,
          url: obj.url,
          category: obj.category,
          votes: obj.votes,
          name:name,
          photo:photo,
          postUserId:postUserId,
          image:data.image,
          fname:data.fname,
          lname:data.lname,
          gender:data.gender,
          age:data.age,
          email:data.email
        }
        
        console.log(obj1);
        posts1 = posts1.concat(obj1);
        
      }
    }
    console.log("again data");
    console.log(data);


    res.status(201).json({status:201,data:data,posts:posts1});
  }
  catch(err)
  {
    console.log(err);
    res.status(201).json({status:400});
  }
})


app.post("/viewTalent",async(req,res)=>{
  try{
    const category = req.body.category;
    var posts = await Posts.find({category:category})
    .sort({'score': -1,'date':1})
    .skip((req.body.page-1)*req.body.limit).limit(req.body.limit);
    console.log(posts.length);
    var posts1 = [];
    console.log("here",(req.body.page-1)*req.body.limit);
    
    for(let i=0;i<posts.length;i++)
    {
      const data = await Register.findOne({email:posts[i].user});
      console.log(i,data);
      let name = data.fname+" "+data.lname;
      let photo = data.image;
      let postUserId = data._id;
      let username = data.username;

      let obj = posts[i];
      let obj1={
        _id: obj._id,
        username:username,
        date: obj.date,
        caption: obj.caption,
        type: obj.type,
        url: obj.url,
        category: obj.category,
        votes: obj.votes,
        name:name,
        photo:photo,
        postUserId:postUserId
      }
      
      //console.log(obj1);
      posts1 = posts1.concat(obj1);
    }
    
    res.status(201).json({status:201,posts:posts1});
    //console.log(posts);
  }catch(err)
  {
    console.log(err);
    res.status(400).json({status:400});
  }
})

app.post('/fpass',async(req,res)=>{
  try{
    const data = await Register.findOne({email:req.body.email});
    if(data)
    {
      data.password=req.body.pass;
      await data.save();
    }
    else
    {
      res.status(400).json({status:400})  
    }
  }
  catch(err)
  {
    console.log(err);
    res.status(400).json({status:400})
  }
})

app.post("/fuser",async(req,res)=>{
  try{
    const data = await Register.findOne({email:req.body.email});
    if(data)
    {
      const user = process.env.USER;
      const pass = process.env.PASSWORD;
      const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: user,
          pass: pass,
        },
      });
      const characters = '0123456789';
      let confirmationCode = '';
      for (let i = 0; i < 6; i++) {
        confirmationCode += characters[Math.floor(Math.random() * characters.length )];
      }
      transport.sendMail({
        from: user,
        to: req.body.email,
        subject: "Change Password",
        html: `<h3>Hello ${data.fname}</h3>
            <p>Your One Time Password is ${confirmationCode} (valid for only 10 minutes)</p>
            `,
      }).catch(err => console.log(err));
      res.status(201).json({status:201,code:confirmationCode});
    }
    else
    res.status(400).json({status:400})
  }
  catch(err)
  {
    console.log(err);
    res.status(400).json({status:400})
  }
})

app.post("/hireUser",async(req,res)=>{
  try{
    const subject = req.body.subject;
    const content = req.body.content;
    const username = req.body.username;
    const HRemail = req.body.HRemail;
    const data = await Register.findOne({username:username});
    const userEmail = data.email;
    
    const user = process.env.USER;
    const pass = process.env.PASSWORD;
    
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });
    transport.sendMail({
      from: user,
      to: userEmail,
      subject: subject,
      html: `<h3>Hello ${data.fname}</h3>
          <p>Someone from our platform with email as ${HRemail} wants to contact you for the hiring process</p>
          <p style="font-weight:bold;">Following is the content sent by hiring person:-</p>
          <p>${content}</p>

          <p style="font-size:10px;color:grey;">For any kind of fraud, we are not responsible</p>
          `,
    }).catch(err => console.log(err));

    res.status(201).send({status:201});

  }
  catch(err)
  {
    console.log(err);
    res.status(201).json({status:400});
  }
})


app.post("/uploadTalent",async(req,res)=>{
  try{
    const fileStr = req.body.data;
    let resource_type = "raw";
    if(req.body.type==="Image")
    {
      resource_type="image";
    }
    if(req.body.type==="Audio"||req.body.type==="Video")
    {
      resource_type="video";
    }
    
    const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
      upload_preset: 'tp-images',
      resource_type: resource_type
    })
    console.log(uploadedResponse);
    //const data = await Register.findOne({email:req.body.user});
    //console.log(data);

    const post = new Posts({date:new Date(),user:req.body.user,caption:req.body.caption,type:req.body.type,url:uploadedResponse.url,category:req.body.category});

    // = data.posts.concat({date:new Date(),caption:req.body.caption,type:req.body.type,url:uploadedResponse.url,category:req.body.category});
    //console.log(data);
    
    const resp = await post.save();
    res.status(201).json({status:201});
  }catch(err)
  {
    console.log("File upload error",err);
    res.status(400).json({status:400});
  }
})



app.post("/upload",async(req,res)=>{
  try{
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
      upload_preset: 'tp-images'
    })
    console.log(uploadedResponse);
    await Register.updateOne({email:req.body.user},{$set:{image:uploadedResponse.url}});
    res.status(201).json({status:201});
  }catch(err)
  {
    console.log("Image upload error",err);
    res.status(400).json({status:400});
  }
})
app.post("/confirm",async(req,res)=>{
  try{
    const code = req.body.confirmationCode;
    console.log(code);
    const data = await Register.findOne({confirmationCode:code});
    console.log(data);
    if(!data)
    {
      res.status(200).json({status:400,result:"error"});
    }
    else
    {
      if(data.status==="Active")
      {
        res.status(200).json({status:400,result:"Account already active"});
      }
      else
      {
        await Register.updateOne({confirmationCode:code},{$set:{status:"Active"}});
        res.status(200).json({status:201,result:"Account activated"});
      }
    }



  }catch(err){
    console.log(err);
    res.status(400).json({status:400,error:err});
  }

})
app.post("/register",async (req,res)=>{
  try{
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    let status = "Pending";
    if(req.body.status)
    {
      status=req.body.status;
    }
    const data = await Register.findOne({email:req.body.email});
    console.log(data);
    if(data)
    {
      res.status(201).json({status:400,error:"Already a User"});
    }
    else
    {
      if(password===cpassword)
      {
        

        const employee=new Register({
          username:req.body.fname,
          fname:req.body.fname,
          lname:req.body.lname,
          email:req.body.email,
          gender:req.body.gender,
          age:req.body.age,
          password:password,
          status:status
        })
        //console.log("here");
        
        // employee.password=await bcrypt.hash(password,10); //maine schema wali file me middleware chala diya h
        const result=await employee.save();
        console.log("end");
        res.status(201).json({status:201,result:"successful"});
      }
      else
      {
        res.status(201).json({status:400,error:"passwords are not same"});
      }
    }
  }catch(err){
    console.log(err);
    res.status(201).json({status:400,error:"Already a user"});
  }
})

app.post("/login",async (req,res)=>{
  try{
    const email=req.body.email
    const password=req.body.password;
    const employee= await Register.findOne({email:email});
    const isValid=await bcrypt.compare(password,employee.password);
    
    const token= await employee.createAuthToken();
    console.log(token);

    res.cookie("jwt",token,{
      httpOnly:true,
      // secure:true
    });
    
    if(isValid&&employee.status!=="Pending")
    {
      res.status(201).json({status:201,result:"Login Successful....",data:employee})
    }
    else if(isValid&&employee.status==="Pending")
    {
      res.status(201).json({status:400,error:"Please confirm your email first"});
    }
    else
    {
      res.json({status:400,error:"Invalid email or password",data:employee});
    }
  }catch(err)
  {
    console.log("Invalid email or password"); 
    res.json({status:400,error:"Invalid email or password",data:{}})
  }
})

app.get("/logout",authentication,async (req,res)=>{
  try {
    res.clearCookie("jwt");

    // // logout from single device
    // console.log("logout successful....");
    // req.data.tokens=req.data.tokens.filter((element)=>{
    //   return element.token!=req.token;
    // })

    //logout from all devices
    console.log("logout from all devices successful");
    req.data.deviceCount--;
    
    if(req.data.deviceCount==0)
    {
      //req.data.token="";
      await Register.updateOne({_id:req.data._id},{$set:{token:"",deviceCount:0}});
    }
    else
    {
      await Register.updateOne({_id:req.data._id},{$set:{deviceCount:req.data.deviceCount}});

    }

    console.log(req.data);
    //await req.data.save();
    res.status(201).json({status:201});
  } catch (error) {
    res.status(400).json({status:400,error:error});
  }
})

app.listen(port,()=>{
  console.log(`listening at port number ${port}`);
})