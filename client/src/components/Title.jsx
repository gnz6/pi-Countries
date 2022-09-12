import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Title() {
  return (
    <div className='titleContainer'>
      <NavLink to="/home" className="navTitle">

        <h1 className='titleText'>Gl </h1>
        <img className='titleImg' src='https://pngpress.com/wp-content/uploads/2020/08/uploads_compass_compass_PNG25585.png' alt='logo'/>
        <h1 className='titleText'> beWiki</h1>

      </NavLink>
    </div>
  )
}
