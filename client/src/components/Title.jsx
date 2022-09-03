import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Title() {
  return (
    <div className='titleContainer'>
      <NavLink to="/home" className="navTitle">

        <img className='titleImg' src='https://pngpress.com/wp-content/uploads/2020/08/uploads_compass_compass_PNG25585.png'/>
        <h1 className='titleText'>GlobeWiki</h1>

      </NavLink>
    </div>
  )
}
