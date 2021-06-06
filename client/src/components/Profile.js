import React from 'react'
import LoginFirst from './LoginFirst';

import Navbar from './Navbar';
import UserProfile from './UserProfile';


export default function Profile(props) {


    return (
        <>
            {console.log(props.match.params.username)}
            <Navbar></Navbar>
            {
                window.sessionStorage.getItem("status")==="online"&&props.match.params.username!==undefined&&
                <UserProfile username={props.match.params.username} />
            }
            {
                window.sessionStorage.getItem("status")==="online"&&props.match.params.username===undefined&&
                <UserProfile username={JSON.parse(sessionStorage.getItem("data")).username} />
            }
            {
                (window.sessionStorage.getItem("status")==="offline"||window.sessionStorage.getItem("status")===null)&&
                <LoginFirst/>
            }
    </>
    )
}
