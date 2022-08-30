import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom';
import { filterByActivity, filterByContinent, getActivities, getCountries, sortByABC, sortByPopulation } from '../redux/actions';
import Card from './Card';


export default function Home(){
    document.title = "CountryApp"

    
    const dispatch = useDispatch();
    const allCountries = useSelector(state=> state.countries)
    const allActivities = useSelector(state=> state.activities)
    const allContinents = useSelector(state=> state.continents)

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

    //Orders
    const[order, setOrder]= useState("");


    const handleOrderABC = (e)=>{
        e.preventDefault();
        dispatch(sortByABC(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(0)
    }


    const handleOrderPopulation = (e)=>{
        e.preventDefault();
        dispatch(sortByPopulation(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(0)
    }



    //filters


    const handleContinentChange =(e)=>{
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(0)
    }

    const handleActivityChange =(e)=>{
        e.preventDefault();
        dispatch(filterByActivity(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(0)
    }






  return (
    <div>
        <h1>COUNTRIES</h1>


        <div className='orderAplhaContainer'>
                <label>Order by Alphabet:
                    <select name='order' onChange={handleOrderABC}>
                        <option disabled defaultValue="ABC">ABC</option>
                        <option value="ABC">ABC</option>
                        <option value= "des">  A-Z  ↓↑</option>
                        <option value= "asc">  Z-A  ↑↓ </option>
                    </select>
                </label>
            </div>


            <div className='orderPopulationContainer'>
            <label>Order by Population:
                <select name='population' onChange={handleOrderPopulation}>
                    <option disabled defaultValue="default">Rating</option>
                    <option value="default">Population</option>
                    <option value = "high"> More Populated </option>
                    <option value= "low"> Less populated </option>
                </select>
            </label>
        </div>



        <div>
            <button onClick={prevPage}>Prev</button>
            <button onClick={handleClick}>REFRESH</button>
            <NavLink to={"/createActivity"}><button>Create Activity</button></NavLink>
            <button onClick={nextPage}>Next</button>
        </div>


        <div className='filterContainer'>
        <label> Continent:
        <select name='continent' defaultValue={"all"} onChange={handleContinentChange}>
            <option value="all" >Anywhere</option>
            {allContinents.map(c=> 
               <option value={c} name="continent">{c}</option>
           )} 
        </select>
    </label> 


    <label> Activities:
        <select name='activities' defaultValue={"all"} onChange={handleActivityChange}>
            <option value="all" >Anywhere</option>
            {allActivities.map(a=> 
               <option value={a.name} name="continent">{a.name}</option>
           )} 
        </select>
    </label> 



</div> 
    



        <div className='sbContainer'>
            <input onChange={handleSearch} placeholder="Search Countries..."/>
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
