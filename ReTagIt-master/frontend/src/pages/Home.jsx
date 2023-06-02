import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { reset, logout } from '../features/auth/authSlice'
import Items from '../components/Items'

import "../style/home.css"
import Footer from "../components/Footer"

function Home() {
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  // const {user} = useSelector((state) => state.auth)

  // function logoutUser() {
  //   dispatch(logout())
  //   dispatch(reset())
  // }

  // function loginUser() {
  //   navigate("/login")
  // }

  function viewItems() {
    navigate("/viewAllItems")
  }

  function sellItem() {
    navigate("/addItem")
  }

  return (
    <>
        {/* <Items /> */}
        {/* <section className='intro-1'>
          <div className="intro-1-desc">
            <div className="title-slogan">ReTagIt</div>
            <div className="title-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, assumenda.</div>
          </div>
          <div className="intro-1-img">
            <img src='./img/intro-1.svg' width={550}/>
          </div>
        </section>


        <section className='intro-2-sec'>
          <div className='intro-2'>
            <div className="intro-2-desc">
              <div className="slogan">ReTagIt</div>
              <div className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, assumenda.</div>
            </div>
            <div className="intro-2-img">
              <img src='./img/intro-2.svg' width={450}/>
            </div>
          </div>
        </section>

        <section className='intro-sec-3'>
          <div className="card">
            <img src='./img/card-1.svg' width={250} height={280}/>
            <div className="card-title">ReTag your item</div>
            <div className="card-desc"></div>
          </div>
          <div className="card">
            <img src='./img/card-2.svg' width={250} height={280}/>
            <div className="card-title">With Robust security</div>

            <div className="card-desc">  </div>
          </div>
          <div className="card">
            <img src='./img/card-3.svg' width={250} height={280}/>
            <div className="card-title">Make a request</div>

            <div className="card-desc"></div>
          </div>
        </section>

        <Footer /> */}
        <div className='home'>
    <center>
    <div style={{zIndex: 2, width: "50%", margin:"25px" ,  justifyContent:"center", alignItems:"center"}}>
    <div>
    {/* <img src='./img/free2.jpg' style={{height: "100px"}}/> */}
    </div>
      <div style={{margin: "10px"}}><h1 style={{color:"red", fontFamily:"fantasy"}}>Lets ReTagIt!</h1>
      <h5 style={{fontFamily: "-moz-initial"}}>Find something useful,<br/> donate something not in use,<br/> and join a community doing good.</h5>
      </div>
    </div>
    <button className="btn btn-block login-btn-btn" style={{margin: "10px"}} onClick={() => viewItems()} >
      View Products
      </button>
      <button className="btn btn-block login-btn-btn" style={{margin: "10px"}} onClick={() => sellItem()}>
      Start Selling!
      </button>
      <hr style={{width: "200px"}}/>
    <div style={{zIndex: 2, width: "50%", fontFamily: "cursive", marginTop: "50px", marginBottom: "50px", backgroundColor: "beige"}}>
      <br/>  
      <h5>About us</h5>
      <h6><b>ReTagIt</b> is a Free Store where various clothing and household goods are available to the community at no charge. <br/>This service helps families stay afloat financially. They can use their income to pay for shelter, food and transportation while “shopping” for free clothing, shoes, bed linens, dishes, cookware, toys—even beds, couches, and refrigerators.<br/> 
      The Free Store also provides an opportunity for folks in Central Texas to get involved in a helping way.<br/> “Re-use and Recycle” is becoming the mantra of the decade as people strive to take care of their environment and limit the volume of trash added weekly to area landfills. One man’s trash is another man’s treasure! Items that are re-usable can be put back into circulation.
      <br/><br/>
      Who is eligible?
      <br/>
      Anyone!
      <br/><br/>
      What documentation is required?
      <br/>
      None! 
      <br/>
      Bring something in and take something away at the same time. Sharing is the name of the game.
      <br/>
      Please Donate to our Thrift Store!</h6>
      <br/>
    </div></center>
    </div>
</>

  )
}

export default Home
