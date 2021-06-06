import React,{useState} from 'react'
import { useHistory } from 'react-router'
import '../styles/Post.css'


export default function Post(props) {

    const history = useHistory();

    const [like, setlike] = useState(props.item.like)
    const [dislike, setdislike] = useState(props.item.dislike)
    const [currentLike, setcurrentLike] = useState(props.item.currentLike)
    const [currentDislike, setcurrentDislike] = useState(props.item.currentDislike)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };


    const handleVotes = (vote,postId,postUserId) => {
        const userId = JSON.parse(window.sessionStorage.getItem("data"))._id;
        console.log("UserId",userId);
        
        fetch('/handleVote',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                postId:postId,
                userId:userId,
                vote:vote,
                postUserId: postUserId
            })
        })
        
    }

    const handleLike = (postId,postUserId) =>{
        
        if(!currentLike)
        {
            handleVotes(1,postId,postUserId);
            if(currentDislike)
            {
                setdislike(dislike-1);
                setcurrentDislike(false);
            }
            
            setlike(like+1);
            setcurrentLike(true);
        }
    }

    const handleDislike = (postId,postUserId) =>{
        
        if(!currentDislike)
        {
            handleVotes(-1,postId,postUserId);
            if(currentLike)
            {
                setlike(like-1);
                setcurrentLike(false);
            }
            
            setcurrentDislike(true);
            setdislike(dislike+1);
        }
    }

    const viewProfile = () =>{
        history.push({
            pathname: '/profile/'+props.item.username
        });
    }


    return (
        <div className="card my-3">
            <div className="header p-2 viewprofile" onClick={viewProfile}>
                <img src={props.item.photo} alt="" style={{width:"50px",height:"50px",borderRadius:"50%"}} />
                <div className="pl-3" style={{display:"inline"}}>
                    <h4 style={{display:"inline",paddingBottom:"0px"}}>{props.item.name}</h4>
                    <p style={{display:"flex",flexDirection:"column",fontSize:"12px",marginLeft:"65px",paddingTop:"0px"}}>{new Date(props.item.date).toLocaleTimeString()} {new Date(props.item.date).toLocaleDateString(undefined,options)}  </p>
                </div>
                <p className="pt-2" style={{fontSize:"12"}}>{props.item.caption}</p>
            </div>
            <div className="middle p-1 pb-3 mx-auto">
                {
                    props.item.type==="Audio"&&
                    <audio controls>
                        <source src={props.item.url} type="audio/mp3"></source>
                    </audio>
                }
                {
                    props.item.type==="Video"&&
                    <video controls className="img-fluid">
                        <source src={props.item.url} type="video/mp4"></source>
                    </video>
                }
                {
                    props.item.type==="Image"&&
                    <img src={props.item.url} alt="" className="mx-auto img-fluid my-3" />
                    
                }
                {
                    props.item.type==="PDF"&&
                    <a className="btn btn-primary " href={`https://docs.google.com/viewer?url=${props.item.url}&embedded=true`} target="blank">Open PDF</a>
                }
                {
                    props.item.type==="Document"&&
                    
                    <a className="btn btn-primary " href={`https://docs.google.com/viewer?url=${props.item.url}&embedded=true`} target="blank">Open Document</a>
                    
                }
            </div>
            <div className="footer" style={{borderTop:"1px solid lightgrey"}}>
                
                {
                    currentLike===true&&
                    <button className="btn w-50 likebtn" style={{borderRight:"1px solid lightgrey"}} onClick={()=>handleLike(props.item._id,props.item.postUserId)}><i className="fa fa-thumbs-up" aria-hidden="true" style={{color:"#065fd4"}}></i> <span>{like}</span></button>
                }
                {
                    currentLike===false&&
                    <button className="btn w-50 likebtn" style={{borderRight:"1px solid lightgrey"}} onClick={()=>handleLike(props.item._id,props.item.postUserId)}><i className="fa fa-thumbs-up" aria-hidden="true"></i> <span>{like}</span></button>
                }
                {
                    currentDislike===true&&
                    <button className="btn w-50 likebtn" onClick={()=>handleDislike(props.item._id,props.item.postUserId)}><i className="fa fa-thumbs-down" aria-hidden="true" style={{color:"blue"}}></i> <span>{dislike}</span></button>
                }
                {
                    currentDislike===false&&
                    <button className="btn w-50 likebtn" onClick={()=>handleDislike(props.item._id,props.item.postUserId)}><i className="fa fa-thumbs-down" aria-hidden="true" ></i> <span>{dislike}</span></button>
                }
                
            </div>
        </div>
    )
}
