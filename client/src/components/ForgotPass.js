import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar' 
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


toast.configure()
export default function ForgotPass(props) {
    const history = useHistory();
    
    const ForgotPassword = (e) => {
        e.preventDefault();
        console.log("here",props);
        if(e.target[0].value===e.target[1].value)
        {
            fetch('fpass',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:props.location.email,
                    pass:e.target[0].value
                })
            })
            history.push('/');
        }
        else if(props.location===undefined||props.location.email===""||props.location.email===undefined)
        {
            toast.error("You came through invalid path",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
        }
        else
        {
            toast.error("Password does not match",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
        }
    }
    
    return (
        
        <div>
            {"render",console.log(props.location.email)}
            <Navbar/>

            <div className="container my-5">
                <div className="row">
                <div className="col-lg-4 col-md-6 col-10 mx-auto">
                    <h2 className="text-center mb-5">Change Password</h2>
                    <form onSubmit={ForgotPassword} method="POST">
                    <div className="form-group">
                        <label>New Password</label>
                        <input required type="password" className="form-control" placeholder="Enter password" id="password" name="password"/>
                        <br/><label>Re-enter New Password</label>
                        <input required type="password" className="form-control" placeholder="Enter password" id="password" name="password"/>
                        
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
