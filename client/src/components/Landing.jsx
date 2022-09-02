import React from 'react';
import{NavLink} from "react-router-dom";
import ".././styles.css"

export default function Landing() {
  return (
    <div className='landingContainer'>
       <div >
         <h1 className='landingText'>Welcome to GlobeWiki!</h1>
    <NavLink to={"/home"} 
    // style={isActive}
    >
        <button className="landingButton">Click to Start</button>
    </NavLink>

       </div>
    {/* <img className='landingImg' src='https://www.freepnglogos.com/uploads/mountain-png/mountain-png-transparent-mountain-images-pluspng-35.png' alt='mountains'/> */}


    </div>
  )
}
