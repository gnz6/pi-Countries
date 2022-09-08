import React, {useEffect} from 'react';
import { getDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import Title from './Title';
import ".././styles.css";
import Footer from "./Footer"


export default function Detail(){
  
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch, id])
  
    const country= useSelector(state=>state.detail);
    const mundialist= useSelector(state=>state.mundialist);
    document.title = "GlobeWiki -"+country.id

  
    return (
    <div>
        {!country || country.id !== id?
        <Loader/>:
        <div className='detailContainer'>
            <Title/>

            <div className='cont'>
                <div className='detailTitleContainer'>
                    <h1 className='detailTitle'>{country.name} </h1>
                </div>

                <div className='wcContainer'>
                {country.name === "Qatar" ? <div className='wc'>
                    <img src='https://www.lifepng.com/wp-content/uploads/2020/12/Fifa-World-Cup-png-hd.png' alt='worldCup'  height="140px"/>
                    <p>Fifa World Cup 2022 Organizer</p>
                </div>
                :
                <div className='wc'>
                {mundialist.includes(country.name)?
                <div className='wc'>
                    <img src='https://www.lifepng.com/wp-content/uploads/2020/12/Fifa-World-Cup-png-hd.png' alt='worldCup' height="140px"/>
                    <p>Fifa World Cup 2022 Participant</p>

                </div>:
                null}
                </div>
                }
                </div>

            </div>
            
            
                <div className='detailDataContainer'>
           
            <div className='flagContainer'>
                <img className='countryFlag' src={country.flag} alt={`${country.name}.jpg`} height="300px" width="500px"/>
                <p>{country.name} National Flag</p>
            </div>
            
        <div className='detailUpUn'>
        <div className='detailUpper'>

            <div className='detailSubregionContainer'>
                <h4>Continent-Subregion</h4>
                <h3 className='detailSubregion'> {country.continent} - ( {country.subregion})</h3>
            </div>

            <div className='detailCapitalContainer'>
                <h4>Country Capital</h4>
                <h3 className='detailCapital'>{country.capital}</h3>
            </div>

        </div>

        <div className='detailUnder'>

            <div className='detailAreaContainer'>
                <h4>Area</h4>
                <h3 className='detailArea'>{country.area} km²</h3>
            </div>

            <div className='detailPopulationContainer'>
                <h4>Population</h4>
                <div className='popContainer'>

                <h3 className='detailPopulation'>{`${country.population}-` }</h3>
                <h3 className='detailPopulation'> 
                {country.population.toString().length >= 6? ` Million`:
                country.population.toString().length === 5 || country.population.toString().length === 4? " Thousand" :
                country.population.toString().length === 3? " Hundred ":
                country.population.toString().length < 3? + " People" :null
            }
                </h3>
            </div>
                
                 

            </div>
        </div>

        </div>
        </div>

            {country.activities[0]?
                
                <div className='detailActivitiesContainer'>
                    <h2>Recomended Activities from {country.name}</h2>
                <div className='detailActivitiesContainer2'>

                    {country.activities.map(a=><div className='detailActivity'>
                        <h3 className='activityName'>{a.name}</h3>
                        <p>Dificulty :{a.dificulty} ★</p>
                        <p>Duration :{a.duration} hour/s</p>
                        <p>Recomended Season :{a.season}</p>

                    </div>)}
                    </div>
                </div>
            :
            <div className='detailActivitiesContainer'><h4> No regitered Activities yet</h4></div>
        
    }
            

            <NavLink to={"/home"}>
                <button className='detailButton'>Return to GlobeWiki</button>
            </NavLink>
        </div>}
        <Footer/>
    </div>
  )
}
