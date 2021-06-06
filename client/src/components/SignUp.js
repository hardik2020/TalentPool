import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar' 
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const SignUp = () => {
    const history = useHistory();
    const [user,setUser] = useState({fname:'',lname:'',email:'',gender:'',age:'',password:'',cpassword:''});
    let name,value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();
        const {fname,lname,email,gender,age,password,cpassword} = user;
        const status = "Pending";
        const res = await fetch('/register',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                fname,lname,status,email,gender,age,password,cpassword
            })
        });
        const data = await res.json();
        console.log(data);
        if(!data||data.status === 400)
        {
            let err='Registration unsuccessful';
            if(data)
            {
                err=data.error;
            }
            toast.error(err,{autoClose:2000,position:toast.POSITION.TOP_CENTER});
            console.log('Registration unsuccessful');
        } 
        else{
            toast("Registration successful. Please check your email",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
            console.log('Registration successful');
            history.push('/login');
        }
    }

    return (
        <div>
            
            <Navbar/>
            <div className="container py-4">
                <div className="row">
                <div className="col-md-8 col-12 mx-auto">
                <h2 className="text-center mb-5">User Registeration Form</h2>
                    <form method="POST" onSubmit={PostData}>
                    <div className="row form-group">
                        <div className="col">
                        <label>First Name</label>
                        <input required type="text" className="form-control" onChange={handleChange} placeholder="Enter first name" name="fname"/>
                        </div>
                        <div className="col">
                        <label>Last Name</label>
                            <input required type="text" className="form-control" onChange={handleChange} placeholder="Enter last name" name="lname"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input required type="email" className="form-control" onChange={handleChange} placeholder="Enter email" name="email"/>
                    </div>
                    
                    <div className="form-group">
                        <label>Gender</label>
                        <div className="form-check">
                        <input required className="form-check-input" type="radio" onChange={handleChange} name="gender" value="Male"/>
                        <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" onChange={handleChange} name="gender" value="Female"/>
                        <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" onChange={handleChange} name="gender" value="Other"/>
                        <label className="form-check-label">Other</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input required type="number" className="form-control" onChange={handleChange} placeholder="Enter your age" name="age"/>
                    </div>
                    <div className="row form-group">
                        <div className="col">
                        <label>Password</label>
                        <input required type="password" className="form-control" onChange={handleChange} placeholder="Password" name="password"/>
                        </div>
                        <div className="col">
                        <label>Confirm Password</label>
                        <input required type="password" className="form-control" onChange={handleChange} placeholder="Confirm Password" name="cpassword"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" value="Register">Submit</button>
                    </form>
                </div>
                </div>
            </div>


        </div>
    )
}
export default SignUp;