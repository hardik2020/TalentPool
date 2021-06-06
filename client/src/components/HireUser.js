import React,{useState} from 'react'
import Navbar from './Navbar'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function HireUser(props) {

    const [subject, setsubject] = useState("")
    const [content, setcontent] = useState("")
    const [disabled, setdisabled] = useState(false)

    const handleSubject = (e) =>{
        setsubject(e.value);
    }
    const handleContent = (e) => {
        setcontent(e.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value,e.target[1].value);
        const subject = e.target[0].value;
        const content = e.target[1].value;
        const username = props.match.params.username;
        const HRemail = JSON.parse(sessionStorage.getItem("data")).email;
        setdisabled(true);
        fetch('/hireUser',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                username,subject,content,HRemail
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setdisabled(false);
            if(data.status===201)
            {
                toast.success("Email sent to user successfully!!",{position:toast.POSITION.TOP_CENTER});
                setcontent("");
                setsubject("");
            }
            else{
                toast.error("Some error occured. Please try again after sometime",{position:toast.POSITION.TOP_CENTER})
            }
        })

    }

    return (
        <div>
            <Navbar/>
            <div className="row text-center mx-auto">
                <div className="col-md-6 col-12 mx-auto mt-5 px-md-5 py-4" style={{backgroundColor:"rgba(223, 226, 238, 0.897)"}}>
                <h2 className="mb-4 text-capitalize pt-md-3 pb-2 text-primary">Write Email content to offer/hire user</h2>
                <form className="pb-3" onSubmit={handleSubmit}>
                    <textarea className="w-100" onChange={handleSubject} value={subject} style={{height: "5vh;"}} placeholder="Subject" required></textarea><br/>
                    <textarea className="w-100" onChange={handleContent} value={content} style={{height: "45vh"}} placeholder="Write content here...." required></textarea><br/>
                    <input type="submit" className="mt-3" value="Send Email" disabled={disabled}/>
                </form>
                </div>
            </div>
        </div>
    )
}
