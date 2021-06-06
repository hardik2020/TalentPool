import React, { Component } from 'react'
import Navbar from './Navbar';

export default class Welcome extends Component {
    constructor() {
        super();
        this.state = { msg: '' };
    }
    componentDidMount()
    {
        var msg = <h4>Your account is confirmed!! Please Login</h4>;
        console.log("inside welcome",this.props.match.params.confirmationCode);
        fetch('/confirm',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                confirmationCode:this.props.match.params.confirmationCode
            })
        }).then(res => res.json())
        .then(json => {
            if(json.status===400&&json.result!=="Account already active")
            {
                msg = <h4>Wrong code</h4>;
                
            }
            else if(json.result==="Account already active")
            {
                msg = <h4>Your account is already confirmed.</h4>
            }
            this.setState({msg:msg});
            
        });
        
        
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="row" style={{backgroundColor:"#20c997",width:"auto",marginLeft:"0px",marginRight:"0px",marginBottom:"0px",height:"92vh",overflow:"hidden"}}>
            
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={{overflow:"hidden"}}>
                <div className="text-white rotdiv justify-content-center align-items-center" style={{overflow:"hidden",border:"2px dotted white",padding:"5rem",maxWidth:"80%",maxHeight:"50vh"}}>
                    
                    <h4 style={{fontFamily: 'Lemonada',fontSize: '1.5rem'}}>{this.state.msg}</h4> 
                </div>   
            </div>
        </div>
            </div>
        )
    }
}
