import React from 'react'

export default function Card({name, id, flag, continent, population}){
  return (
    <div key={id} className='cardContainer'>
        <h2 className='cardTitle'>{name}</h2>
        <div className='flagContainer'>
            <img src={flag} alt={`${name}.jpg`} height="200px" width="300px"/>
        </div>
        <h4> Continent: {continent}</h4>
        <p>Population: {population}</p>


    </div>
  )
}
