// import newuser from "../../../server/upload/newuser.jpg"
import {useState,useEffect} from 'react';
import React from 'react';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const UserProfile=(props)=>{
  const ref = React.useRef();
  const [previewSource,setpreviewSource] = useState()
  const [page, setpage] = useState(1)


  const fetchMore = async() => {
      setpage(page+1)
  }

  const [data, setdata] = useState()
  const [posts, setposts] = useState([])
    console.log(props);
    useEffect(() => {
        console.log("Inside use effect");
        fetch('/getProfile',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username:props.username,
                page:page,
                limit:5
            })
        })
        .then(res=>res.json())
        .then(data1=>{
            if(data1&&data1.status===201)
            {
                setdata(data1.data);
                console.log(data1);
                setpreviewSource(data1.data.image);
                data1.posts=posts.concat(data1.posts);
                setposts(data1.posts);
            }
        })
        
        
    }, [page])


    const uploadImage = async (base64EncodedImage) => {
      console.log(base64EncodedImage);
      try{
        console.log("try");
        console.log("Going to upload image for",data);
        const res = await fetch('/upload',{
          method:'POST',
          body:JSON.stringify({data:base64EncodedImage,user:data.email}),
          headers:{'Content-type':'application/json'}
        });
        const data1 = await res.json();
        if(data1.status===400)
        {
          toast.error("Image Upload error",{position:toast.POSITION.TOP_CENTER});
        }
        else
        {
          toast.success("Image Uploaded",{position:toast.POSITION.TOP_CENTER});
        }
      }catch(err)
      {
        
        console.log("Caught error",err);
      }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!previewSource)
        {
          return;
        }
        uploadImage(previewSource);

    }
    const previewImage = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        setpreviewSource(reader.result);
      }
    }
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log(file);
      previewImage(file);
      ref.current.value = "";
    }
return(
  <> 
  {
    data!==undefined&&
    <div className="container mx-auto">
      {console.log("inside render",data)}
      <p style={{fontSize: "40px"}} className="text-center text-primary pt-3">{data.fname}'s Profile</p>
      <hr className="w-50 mx-auto" />
      <div className="row mx-auto pb-3">
        <div className="col-lg-4 col-md-4 col-10 pt-4  mx-auto order-md-1 order-2">
          <table>
            <thead>
              <tr><td>Name:</td><td>{data.fname} {data.lname}</td></tr>
            </thead>
            <tbody>
              <tr><td>Email:</td><td>{data.email}</td></tr>
              <tr><td>Gender:</td><td>{data.gender}</td></tr>
              <tr><td>Age:</td><td>{data.age}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-4 col-10 pt-4 mx-auto order-md-2 order-1 text-center">
          <img style={{width:"200px",height:"200px",borderRadius:"176px"}} src={previewSource} alt="userPic" className="img-fluid" />
          {
            data.username===JSON.parse(sessionStorage.getItem("data")).username&&
            <div>
              <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                  <label>Upload Image</label><br/>
                  <input type="file" name="file" onChange={handleFileChange} ref={ref}/><br/><br/>
                  
                  <button type="submit" className="btn btn-block btn-primary">Upload/Edit Image</button>
              </form>
            </div>
          }
          {
            data.username!==JSON.parse(sessionStorage.getItem("data")).username&&
            <a className="btn btn-block btn-primary mt-3 w-75 mx-auto" href={"/hireUser/"+data.username}>Hire {data.fname}</a>
          }
        </div>
      </div>
    </div>
  }
  {
    data!=undefined&&
    <div style={{backgroundColor:"rgb(230, 230, 230)"}}>
      <p style={{fontSize: "40px"}} className="text-center text-primary pt-3 mt-5">Posts</p>
      <hr className="w-50 mx-auto" />
      <div className="row mx-auto pt-md-4">
        {console.log("data",data)}
        <div className="col-lg-5 col-md-7 col-12 mx-auto">
        <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMore}
                    hasMore={true}
                >
        {
          posts.map((item,idx)=>{
            return (
                <Post key={idx} item={item}/>
            );
          })
        }
        </InfiniteScroll>
        </div>
      </div>
    </div>
  }
  </>
  )
}

export default UserProfile