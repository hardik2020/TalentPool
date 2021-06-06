import React,{useEffect,useState} from 'react'
import LoginFirst from './LoginFirst';
import Navbar from './Navbar';


export default function ListTalent(props) {
    const [desc, setdesc] = useState("")
    const [arr, setarr] = useState([])
    
    useEffect(() => {
        fetch('/categories',{
            method:'POST'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setarr(data.arr);
        })
        if(props.match.params.code==="show")
        {
            setdesc("Choose your talent from the following")
        }
        else if(props.match.params.code==="view"){
            setdesc("Which talent you would like to view/hire")
        }
        else{
            window.location='/error';
        }
    }, [])
    return (
        <>
            <Navbar/>
            {window.sessionStorage.getItem("status")==="online" &&<div className="container-fluid">
                <h2 className="text-center pt-4 pb-3" style={{fontSize:"45px",fontWeight:"bold",color:"purple"}}>{desc}</h2>
                <div className="row  text-center">
                    <div className="col-lg-10 col-md-11 col-12 mx-auto">
                        {arr.map((item,idx)=>{
                            return (<button key={idx} onClick={()=>{
                                if(desc.length===37)
                                {
                                    props.history.push({
                                        pathname: `/postTalent/${item}`
                                    })
                                }
                                else
                                {
                                    props.history.push({
                                        pathname: `/viewTalent/${item}`
                                    })
                                }
                            }} className="btn btn-primary" style={{margin:"15px",width:"230px",height:"75px",borderRadius:"50%"}}><font size="4">{item}</font></button>);
                        })}
                    </div>
                </div>
            </div>}
            {
                (window.sessionStorage.getItem("status")==="offline"||window.sessionStorage.getItem("status")===null) && <LoginFirst/>
            }

        </>
    )
}
