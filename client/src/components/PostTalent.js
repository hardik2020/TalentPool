import React,{useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import Navbar from './Navbar'

import 'react-toastify/dist/ReactToastify.css';
import LoginFirst from './LoginFirst';
toast.configure()

export default function PostTalent(props) {
    const ref = React.useRef();
    
    const [caption, setcaption] = useState("")
    const [arr, setarr] = useState([])
    const [disabled, setdisabled] = useState(false)

    useEffect(() => {
        fetch('/categories',{
            method:'POST'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setarr(data.arr);
        })
        
    }, [])


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleChange = (e) => {
        setcaption(e.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let file64=null;

        const [caption,type,file]=[e.target[0].value,e.target[1].value,e.target[2].files[0]];
        const email = JSON.parse(window.sessionStorage.getItem("data")).email;
    

        console.log(caption,type,email,file);
        const category = props.match.params.category;

        file64 = await toBase64(file);
        // check validation of file type
        let extension = file.name.split('.').pop();
        let valid=false;
        if(type==="Audio"&&extension==="mp3")
        {
            valid=true;
        }
        else if(type==="Image"&&(extension==="jpg"||extension==="jpeg"||extension==="png"))
        {
            valid=true;
        }
        else if(type==="Video"&&extension==="mp4")
        {
            valid=true;
        }
        else if(type==="PDF"&&extension==="pdf")
        {
            valid=true;
        }
        else if(type==="Document"&&(extension==="doc"||extension==="docx"||extension==="txt"))
        {
            valid=true;
        }
        
        if(!valid)
        {
            toast.error("Attempted Wrong File Type Submission",{position:toast.POSITION.TOP_CENTER});
            return false;
        }

        // Fetch APi
        try{
            toast.info("Uploading...",{autoClose:2000,position:toast.POSITION.TOP_CENTER})
            setdisabled(true);
            const res = await fetch('/uploadTalent',{
              method:'POST',
              body:JSON.stringify({data:file64,user:email,caption:caption,type:type,category:category}),
              headers:{'Content-type':'application/json'}
            });
            const data = await res.json();
            console.log(data);
            
            if(data.status===400)
            {
              toast.error("Some error occured",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
            }
            else
            {
              toast.success("Posted Successfully",{autoClose:2000,position:toast.POSITION.TOP_CENTER});
              ref.current.value = "";
              setcaption("");
            }
            setdisabled(false);
          }catch(err)
          {
            console.log(err);
          }
    }
    

    return (
        <>
        <Navbar/>
        {console.log(props)}
        {
            window.sessionStorage.getItem("status")==="online"&&arr.includes(props.match.params.category)&&
            <div className="mx-auto bg-light" style={{height:"100vh"}}>
                <div className="row mx-auto">
                <div className="col-lg-4 col-md-6 col-12 mx-auto py-5">
                <h2 className="text-primary text-justify">Upload, what do you want to share with community</h2>
                    <form className="ml-3 mr-3" style={{paddingTop: "10vh"}} onSubmit={handleSubmit}>
                    <label>Caption:</label><br/>
                    <textarea name="caption" onChange={handleChange} value={caption} className="w-75 mb-3" style={{height:"10vh"}} placeholder="Write something here about your post..."></textarea>
                    
                    <div className="py-5">
                        <label className="pb-3">Which type of file you want to upload</label><br/>
                        <select name="ftype" >
                        
                        <option>Image</option>
                        <option>PDF</option>
                        <option>Audio</option>
                        <option>Video</option>
                        <option>Document</option>
                        </select><br/>
                    </div>
                    <input required className="py-3" type="file" name="file" ref={ref}/><br/>
                    <input type="submit" value="Upload" disabled={disabled}/>
                    </form>
                    
                    {console.log(props.location.category)}
                    


                </div>
                </div>
            </div>
        }
        {
            (window.sessionStorage.getItem("status")==="offline"||window.sessionStorage.getItem("status")===null)&&
            <LoginFirst/>
        }
        
        </>
    )
}

