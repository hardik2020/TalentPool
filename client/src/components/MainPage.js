import React from 'react'
import image1 from '../images/image1.png';

export default function MainPage() {
  return (
  <>

    <section className="py-lg-3">
      <div className="container-fluid py-lg-5 py-3">
        <div className="row mx-auto pt-5 h-100">
          <div className="col-md-5 col-12 mx-auto text-center pt-5">
            <h1 className="text-primary pt-3">Where you find talent from all over India</h1>
            <p className="pt-4" style={{fontSize:"30px",color:"#6f42c1"}}>Millions of talented people maintain their profile, show their talent and get hired on TalentPool.</p>
          </div>
          <div className="col-md-6 col-8 mx-auto py-5  text-center">
            <img src={image1} style={{width:"250px",height:"300px"}} alt="pic" className="img-fluid"></img>
          </div>
        </div>
      </div>
    </section>


    <section className="pt-lg-5 mt-lg-5">

      <div className="container-fluid" style={{width:"100%",height: "90vh",paddingTop:"30vh",backgroundImage:"linear-gradient(135deg,#0165fa,purple)"}}>
        <div id="demo" className="carousel slide pt-5" data-ride="carousel">
          <div className="carousel-inner text-center w-75 mx-auto" style={{color:"gainsboro"}}>
            <div className="carousel-item active">
              <h2>Show your Talent to the whole world</h2>
            </div>
            <div className="carousel-item">
              <h2>View the talent posted by talented persons all over India</h2>
            </div>
            <div className="carousel-item">
              <h2>Get hired by showing your talent to the whole world</h2>
            </div>
            <div className="carousel-item">
              <h2>Hire the diverse talent from all over India.</h2>
            </div>
          </div>
          
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>


      <div className="icons pb-5 text-center" style={{width:"100%",height: "10vh",backgroundColor:"#faf0be",padding:"1vh"}}>
          <a className="px-3" href="https://www.facebook.com/" ><i className="fa fa-facebook" style={{fontSize:"48px",color:"#3b5998"}}></i></a>
          <a className="px-3" href="https://twitter.com/?lang=en" ><i className="fa fa-twitter" style={{fontSize:"48px",color:'#55acee'}}></i></a>
          <a className="px-3" href="https://www.youtube.com/" ><i className="fa fa-youtube" style={{fontSize:"48px",color:"#ed302f"}}></i></a>
          <a className="px-3" href="https://www.instagram.com/" ><i className="fa fa-instagram" style={{fontSize:"48px",color:"#ac2bac"}}></i></a>
      </div>

    </section>
  </>

  )
}