import React,{useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-toastify/dist/ReactToastify.css';
import LoginFirst from './LoginFirst';
import Navbar from './Navbar';
import Post from './Post';
toast.configure()



export default function ViewTalent(props) {
    const [posts, setposts] = useState([])
    const [arr, setarr] = useState([])
    const [loaded, setloaded] = useState(false)
    const [page, setpage] = useState(1)


    const fetchMore = async() => {
        setpage(page+1)
    }


    useEffect(() => {
        console.log("inside usestate");
        let category = props.match.params.category;

        fetch('/categories',{
            method:'POST'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setarr(data.arr);
        })
        
        
        fetch('/viewTalent',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                category:category,
                page:page,
                limit:5
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(!data||data.status===400)
            {
                toast.error("Some error occured",{position:toast.POSITION.TOP_CENTER});
            }
            else
            {
                for(var i=0;i<data.posts.length;i++)
                {
                    var like=0,dislike=0,currentLike=false,currentDislike=false;
                    for(var j=0;j<data.posts[i].votes.length;j++)
                    {
                        if(data.posts[i].votes[j].id===JSON.parse(window.sessionStorage.getItem("data"))._id)
                        {
                            if(data.posts[i].votes[j].vote>0)
                            {
                                currentLike=true;
                            }
                            else if(data.posts[i].votes[j].vote<0)
                            {
                                currentDislike=true;
                            }
                        }
                        if(data.posts[i].votes[j].vote>0)
                        {
                            like++;
                        }
                        else if(data.posts[i].votes[j].vote<0)
                        {
                            dislike++;
                        }
                    }
                    console.log(data.posts[i]);
                    data.posts[i].like=like;
                    data.posts[i].dislike=dislike;
                    data.posts[i].currentLike=currentLike;
                    data.posts[i].currentDislike=currentDislike;
                    console.log(data.posts[i]);
                }
                data.posts=posts.concat(data.posts);

                console.log("here ",data.posts.length);
                console.log(data.posts);
                console.log("finish");
                setposts(data.posts);
                setloaded(true);
            }
        })
    }, [page])


    return (
        <>
        <Navbar/>
        {console.log(props.match.params.category,arr)}
        {
            window.sessionStorage.getItem("status")==="online"&&arr.includes(props.match.params.category)&&
            <div className="row mx-auto" style={{backgroundColor:"rgb(230, 230, 230)"}}>
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
        }  
        {
            window.sessionStorage.getItem("status")==="online"&&loaded&&(arr.includes(props.match.params.category)===false)&&
            <div className="row" style={{backgroundColor:"#20c997",width:"auto",marginLeft:"0px",marginRight:"0px",marginBottom:"0px",height:"92vh",overflow:"hidden"}}>
            
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={{overflow:"hidden"}}>
                <div className="text-white rotdiv justify-content-center align-items-center" style={{overflow:"hidden",border:"2px dotted white",padding:"5rem",maxWidth:"80%",maxHeight:"50vh"}}>
                    <h1 className="err404">404</h1>
                    <h4 style={{fontFamily: 'Lemonada',fontSize: '1.5rem'}}>Page Not Found</h4> 
                </div>   
            </div>
        </div>
            
        } 
        {
            window.sessionStorage.getItem("status")==="online"&&loaded&&(posts.length===0)&&arr.includes(props.match.params.category)&&
            <div className="row" style={{backgroundColor:"#20c997",width:"auto",marginLeft:"0px",marginRight:"0px",marginBottom:"0px",height:"92vh",overflow:"hidden"}}>
            
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={{overflow:"hidden"}}>
                <div className="text-white rotdiv justify-content-center align-items-center" style={{overflow:"hidden",border:"2px dotted white",padding:"5rem",maxWidth:"80%",maxHeight:"50vh"}}>
                    
                    <h4 style={{fontFamily: 'Lemonada',fontSize: '1.5rem'}}>No posts found for this category. Try after sometime</h4> 
                </div>   
            </div>
        </div>
            
        } 
        
        {
            (window.sessionStorage.getItem("status")==="offline"||window.sessionStorage.getItem("status")===null) &&
            <LoginFirst/>
        }

        
        </>
        
    )
}