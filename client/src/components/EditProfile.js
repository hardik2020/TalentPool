import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar' 
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const EditProfile = () => {
    const history = useHistory();
    const [user,setUser] = useState({fname:'',lname:'',gender:'',age:''});
    let name,value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const PostData = (e) => {
        e.preventDefault();
        //console.log(e.gender);
        //console.log(e.target[0].value,e.target[1].value,e.target[2].value,e.target[5].value);

        fetch('/editprofile',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:JSON.parse(window.sessionStorage.getItem("data")).email,
                firstName:user.fname,
                lastName:user.lname,
                gender:user.gender,
                age:user.age,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data&&data.status===201)
            {
                window.sessionStorage.setItem("data",JSON.stringify(data.data));
                toast.success("Profile Edited",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
                history.push('/profile');
            }
            else{
                toast.error("Network error",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
            }
        })
    }
    
    return (
        <div>
            
            <Navbar/>
            <div className="container py-4">
                <div className="row">
                <div className="col-md-8 col-12 mx-auto">
                <h2 className="text-center mb-5">Edit Profile</h2>
                    <form method="POST" onSubmit={PostData}>
                    <div className="row form-group">
                        <div className="col">
                        <label>First Name</label>
                        <input required type="text" className="form-control" onChange={handleChange}   placeholder="Enter first name" name="fname"/>
                        </div>
                        
                    </div>
                    <div className="row form-group">
                        
                        <div className="col">
                        <label>Last Name</label>
                            <input required type="text" className="form-control" onChange={handleChange}   placeholder="Enter last name" name="lname"/>
                        </div>
                    </div>
                   
                    
                    <div className="form-group">
                        <label>Gender</label>
                        <div className="form-check">
                        <input required className="form-check-input" type="radio" onChange={handleChange}   name="gender" value="Male"/>
                        <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" onChange={handleChange}   name="gender" value="Female"/>
                        <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" onChange={handleChange}   name="gender" value="Other"/>
                        <label className="form-check-label">Other</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input required type="number" className="form-control" onChange={handleChange}   placeholder="Enter your age" name="age"/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" value="Register">Submit</button>
                    </form>
                </div>
                </div>
            </div>


        </div>
    )
}
export default EditProfile;