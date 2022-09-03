import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Loader(){
  return (
    <div className='loaderContainer1'>
    <div className='loaderContainer'>
        <img  src='https://cdn.dribbble.com/users/2285476/screenshots/9735849/compass.gif' alt='earthLoader'/>
        <h1 className='loaderText'>Loading...</h1>
        <NavLink to="/"
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

    </div>
  )
}
