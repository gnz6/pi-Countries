import React from 'react'

export default function Card({name, id, flag, continent, population}){
  return (
    <div key={id} className='cardContainer'>
        <h2 className='cardTitle'>{name? 
        name.length > 35?  name.slice(0,12): name : name
      }</h2>
        <div className='flagContainer'>
            <img src={flag} alt={`${name}.jpg`} className="cardImg" />
        </div>
        <h4 className='cardContinent'> Continent: {continent}</h4>
        <h4 className='cardPopulation'> Population: {population}</h4>


    </div>
  )
}
