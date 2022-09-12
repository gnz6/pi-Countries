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
    <footer className='landingFooter'>
    <div className='iconsFooter'>

<a href='https://www.linkedin.com/in/gonzalo-nicol%C3%A1s-pirovano-87a18b201/'>
<img className='iconLanding' src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="linkedin"/>
</a>
<a href='https://github.com/gnz6'>
<img className='iconLanding' src="https://lh3.googleusercontent.com/8v_oGMOj9bgohn50RgLhJ8XGZ2kIUdr0RG4zCkIYnfjK24ORS0WFaTWmnzxXzagUg2fwAmDy1W_Y4oTtIacT2dhQzAqOy5H9Vg23Rq1oVnhUGtOynjY" alt="gmail"/>
</a>
<a href='https://mail.google.com/mail/'>
<img className='iconLanding' src="https://cdn.icon-icons.com/icons2/2368/PNG/512/github_logo_icon_143772.png" alt="github"/>
</a>

</div>    </footer>
    </div>

  )
}
