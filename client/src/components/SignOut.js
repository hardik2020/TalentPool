import React, { Component } from 'react'
import LoginFirst from './LoginFirst';
import Navbar from './Navbar'

export default class SignOut extends Component {
    constructor() {
        super();
        this.state = { msg: '' };
    }
    componentWillMount()
    {
        var msg = <h4>Logged Out</h4>;
        console.log("inside logout");
        fetch('/logout',{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(json => {
            if(json.status===400)
            {
                msg = <LoginFirst/>;
                this.setState({msg:msg});
            }
            else
            {
                window.sessionStorage.setItem("status","offline");
                window.sessionStorage.removeItem("data");
                this.props.history.push('/login');

            }
            
            
        });
        
        
    }
    
    
    render() {
        //let msg = this.PostData();
        console.log("render");
        return (
            <>
                <div>
                    <Navbar></Navbar>
                    {this.state.msg}
                </div>
            </>
        )
    }
}
