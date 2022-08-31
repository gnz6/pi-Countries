import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Return() {
  document.title = "Page not found"
  return (
    <div className="returnContainer">

     
      <h1 className="notFound">Can´t find countries</h1>
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
  )
}
