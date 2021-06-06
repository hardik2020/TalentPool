import React from 'react'
import image2 from '../images/image2.png'
import '../styles/HomePage.css'

export default function HomePage() {
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-12 mx-auto py-md-5 text-center">
          <div className="py-md-5 py-2">
            <h1 style={{color:"purple"}}>Welcome to the community of talented people</h1>
          </div>
          <div className="py-lg-5 py-3">
            <a href="/listTalent/show" className="btn btn-primary w-lg-25 w-md-50 w-75" style={{height:"50px",fontSize:"25px"}}>Show your Talent</a>
          </div>
          <div className="py-2 ">
            <a href="/listTalent/view" className="btn btn-primary w-lg-25 w-md-50 w-75" style={{height:"50px",fontSize:"25px"}}>View/Hire Talent</a>
          </div>


         </div>
        <div className="col-lg-6 col-12 mx-auto">
          <img src={image2} alt="" className="img-fluid" />
        </div>
      </div>
    </div>
    </>
  )
}