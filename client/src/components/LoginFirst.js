import React from 'react'
import '../styles/Error.css'

export default function LoginFirst() {
    return (
        <>
        <div className="row" style={{backgroundColor:"#20c997",width:"auto",marginLeft:"0px",marginRight:"0px",marginBottom:"0px",height:"92vh",overflow:"hidden"}}>
            
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={{overflow:"hidden"}}>
                <div className="text-white rotdiv justify-content-center align-items-center" style={{overflow:"hidden",border:"2px dotted white",padding:"5rem",maxWidth:"80%",maxHeight:"50vh"}}>
                    <h1 className="err404">403</h1>
                    <h4 style={{fontFamily: 'Lemonada',fontSize: '1.5rem'}}>Please Login First</h4> 
                </div>   
            </div>
        </div>
        </>
    )
}
