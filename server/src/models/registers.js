require("dotenv").config();
const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const nodemailer = require("nodemailer");

const employeeSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  fname:{
    type:String,
    required:true
  },
  lname:{
    type:String,
    required:false
  },
  status: {
    type: String, 
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid by validator");
      }
    }
  },
  
  gender:{
    type:String
  },
  age:{
    type:Number
  },
  password:{
    type:String,
    required:true
  },
  deviceCount:{
    type:Number,
    default:0
  },
  token:{
    type:String,
    default:''
  },
  confirmationCode:{
    type:String,
    default:''
  },
  image:{
    type:String,
    default:'https://res.cloudinary.com/danx7nmf1/image/upload/v1620878257/newuser_sckdqw.jpg'
  }
})


employeeSchema.methods.createAuthToken=async function(){
  try {
    const token=jwt.sign(this._id.toString(),process.env.SECRET_KEY);
    console.log("here",token);
    this.token=token;
    this.deviceCount = this.deviceCount + 1
    await this.save();
    return token;
  } catch (error) {
    console.log("the error is: "+error);
    res.status(400).json({status:400,error:"the error is: "+error});
    console.log("the error is: "+error);
  }
}
//middleware for password hashing
employeeSchema.pre("save",async function(next){

  if(this.isModified("username"))
  {
    const data = await Register.find({},{username:1,_id:0});
    let usernames = [];
    for(var i=0;i<data.length;i++)
    {
      usernames=usernames.concat(data[i].username);
    }
    do{
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let username = this.username+"_";
    for (let i = 0; i < 5; i++) {
      username += characters[Math.floor(Math.random() * characters.length )];
    }
    this.username = username;
  }
  while(usernames.includes(this.username));
     
  }
  console.log("username created",this.username);

  if(this.isModified("password"))
  {
    // console.log(this.password);
    this.password=await bcrypt.hash(this.password,10);

    if(this.status==="Pending")
    {
      // email verification
      
      const user = process.env.USER;
      const pass = process.env.PASSWORD;
      
      const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: user,
          pass: pass,
        },
      });
      
      const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let confirmationCode = '';
      for (let i = 0; i < 25; i++) {
        confirmationCode += characters[Math.floor(Math.random() * characters.length )];
      }
      this.confirmationCode = confirmationCode;
      console.log("sending mail now");
      transport.sendMail({
        from: user,
        to: this.email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${this.fname}</h2>
            <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
            `,
      }).catch(err => console.log(err));
    }

    // console.log(this.password);
  }
  

  next();
})

const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;