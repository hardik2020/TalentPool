import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar' 
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


toast.configure()
export default function ForgotUser() {
    const history = useHistory();
    const [otp, setotp] = useState("")
    const [user, setuser] = useState("")
    
    const ForgotPassword = async(e) => {
        e.preventDefault();
        if(otp==="")
        {
            const email = e.target[0].value;
            fetch('/fuser',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if(data&&data.status===201)
                {
                    toast.info("Please check your Email",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
                    setuser(email);
                    setotp(data.code);
                    window.setTimeout(()=>{
                        setotp("");
                    },600000);
                }
                else
                {
                    toast.error("Please Enter a valid email",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
                }
            })
        }
        else
        {
            if(otp===e.target[1].value)
            {
                history.push({
                    pathname: '/forgotpass',
                    email: user
                });
            }
            else
            {
                toast.error("Please Enter a valid OTP",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
            }
        }
        
    }
    
    return (
        <div>
            <Navbar/>

            <div className="container my-5">
                <div className="row">
                <div className="col-lg-4 col-md-6 col-10 mx-auto">
                    <h2 className="text-center mb-5">Enter your Email</h2>
                    <form onSubmit={ForgotPassword} method="POST">
                    <div className="form-group">
                        <label>Email address:</label>
                        <input required type="email" className="form-control" placeholder="Enter email" id="email" name="email" disabled={otp}/>
                        {   
                            otp!==""&&
                            <div>
                                <label>Enter OTP</label>
                                <input required type="text" className="form-control" placeholder="Enter OTP" id="otp" name="otp"/>
                            </div>
                        }
                    </div>
                    
                    <button type="submit" className="btn btn-block btn-primary">Change Password</button>
                    <br/>
                    
                    
                    </form>
                </div>
                </div>
            </div>


        </div>
    )
}
