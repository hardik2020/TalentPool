import React from 'react'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Navbar() {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
            <NavLink className="navbar-brand" exact to="/">Talent Pool</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li> 
                {console.log(window.sessionStorage.getItem("status"))}
                {
                    (window.sessionStorage.getItem("status")==="offline"||window.sessionStorage.getItem("status")===null)&&
                    <>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li> 
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Register</NavLink>
                        </li>
                    </>
                }
                {
                    window.sessionStorage.getItem("status")==="online"&&
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                }
                    
            </ul>
            </div>
        </nav>
        <div className="pt-5"></div>
        <div className="pt-2"></div>
        </>
    )
}
