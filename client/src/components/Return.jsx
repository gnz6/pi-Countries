import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from "./Footer"


export default function Return() {
  document.title = "Page not found"

  return (

    <div>
      <div className="returnContainer">

     
      <h1 className="notFound">Can´t find countries</h1>
      <img src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/34193/globe-clipart-md.png' alt='globe' className='globeImg'/>
    <NavLink to="/home"
    style={({isActive})=>
            ({
                color: isActive? "black": "black",
                backgroundColor: "000",
                textDecoration:"none",
                borderRadius: "15px",
             })}>
        <button className="returnButton">Return to GlobeWiki</button>

    </NavLink>

    </div>
    <Footer/>
    </div>
 
  )
}
