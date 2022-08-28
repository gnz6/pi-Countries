import React from 'react';
import{NavLink} from "react-router-dom";

export default function Landing() {
  return (
    <div>
        <h1>Welcome!</h1>
    <NavLink to={"/home"}>
        <button>Click to Start</button>
    </NavLink>


    </div>
  )
}
