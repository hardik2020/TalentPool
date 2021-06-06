const jwt=require("jsonwebtoken");
const Register=require("../models/registers")


const authentication=async (req,res,next)=>{
  console.log("here to auth");
  try {
    const token=req.cookies.jwt;
    // console.log(typeof(token));
    // console.log("kamlesh"+token+"kamlesh");
    const isValid=jwt.verify(token,process.env.SECRET_KEY); //isValid will be id of user document
    // console.log(isValid); 

    const data=await Register.findOne({_id:isValid});
    //console.log(data);

    if(data.token!==token)
    {
      console.log("ye dikkat");
      res.status(200).json({status:400,error:"please login first.."});
    }

    req.token=token;
    req.data=data;


    next();
  } catch (error) {
    console.log(error);
    res.status(200).json({status:400,error:"please login first.."});
  }
}

module.exports=authentication;