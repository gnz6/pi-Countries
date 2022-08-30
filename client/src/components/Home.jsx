import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom';
import { getActivities, getCountries } from '../redux/actions';
import Card from './Card';


export default function Home(){

    
    const dispatch = useDispatch();
    const allCountries = useSelector(state=> state.countries)
    const allActivities = useSelector(state=> state.activities)

    //localStates
    const [currentPage, setCurrentPage]= useState(0);
    const [search, setSearch]= useState("");

    //useEffect

    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[dispatch])


    //Paging

    const countriesInPage= () =>{
        if(search.length === 0 && currentPage === 0) return allCountries.slice(currentPage, currentPage + 9)
        // if(currentPage > 0) return allCountries.slice(currentPage, currentPage + 10)
        
        const filteredCountries = allCountries.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()))
        console.log(filteredCountries)
        return filteredCountries.slice(currentPage, currentPage + 10)
    }

    const nextPage = ()=>{
        if(allCountries.filter(c=> c.name.includes(search)).length > currentPage + 10){
            setCurrentPage(currentPage + 10)
        }
    }

    const prevPage = ()=>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 10)
        }
    }


    //searchBar && refresh button
    const handleClick =(e)=>{
        e.preventDefault();
        dispatch(getCountries())
        setCurrentPage(0)
    }

    const handleSearch =(e)=>{
        setSearch(e.target.value)
        setCurrentPage(0)
    }


    //filters
    



  return (
    <div>
        <h1>COUNTRIES</h1>

        <div>
            <button onClick={prevPage}>Prev</button>
            <button onClick={handleClick}>REFRESH</button>
            <button onClick={nextPage}>Next</button>
        </div>

        <div className='sbContainer'>
            <input onChange={handleSearch}/>
        </div>


    <div className='cardsContainer'>
        {!countriesInPage()[0]?
        <h1>LOADINGGG</h1>:
        allCountries === "error"?
        <NavLink to={"/"}>
            <button>return</button>
        </NavLink>:

        countriesInPage()?.map(c=>{
            return(
                <div key={c.id} className= "gridCountry">
                    <NavLink to={`/home/${c.id}`}
                    
                    >
                    
                    <Card
                    name={c.name}
                    flag={c.flag}
                    continent={c.continent}
                    population={c.population}
                    />

                    </NavLink>
                
                </div>
            )
        })
    }


    </div>




    </div>
  )
}
