import React, {useEffect} from 'react';
import { getDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Detail(){
  
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch, id])
  
    const country= useSelector(state=>state.detail);
    document.title = country.name +" - CountryApp "

  
    return (
    <div>
        {!country || country.id != id?
        <h1>LOADINGGG</h1>:
        <div className='detailContainer'>
        <h1>Country</h1>    
            <div className='detailIdContainer'>
                <h4 className='detailId'>{country.id}</h4>
            </div>

            <div className='detailTitleContainer'>
                <h1 className='detailTitle'>{country.name}</h1>
            </div>

            <div className='detailContinentContainer'>
                <h1 className='detailContinent'>{country.continent}</h1>
            </div>
           
            <div className='flagContainer'>
                <img src={country.flag} alt={`${country.name}.jpg`} height="500px"/>
            </div>

            <div className='detailCapitalContainer'>
                <h3 className='detailCapital'>{country.capital}</h3>
            </div>

            <div className='detailSubregionContainer'>
                <h3 className='detailSubregion'>{country.subregion}</h3>
            </div>

            <div className='detailAreaContainer'>
                <h3 className='detailArea'>{country.area} km²</h3>
            </div>

            <div className='detailPopulationContainer'>
                <h3 className='detailPopulatiuon'>{country.population} people</h3>
            </div>

            {/* ACTIVITIES */}
            

            <NavLink to={"/home"}>
                <button>Return to CountryApp</button>
            </NavLink>
        </div>}
    </div>
  )
}
