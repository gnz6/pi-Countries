import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom';
import { filterByActivity, filterByContinent, getActivities, getContinents, getCountries, sortByABC, sortByPopulation } from '../redux/actions';
import Card from './Card';
import Loader from './Loader';
import ".././styles.css"
import useLocalStorage from './useLocalStorage';
import Return from './Return';
import Footer from "./Footer"




export default function Home(){
    document.title = "GlobeWiki"

    
    const dispatch = useDispatch();
    const allCountries = useSelector(state=> state.countries)
    const allActivities = useSelector(state=> state.activities)
    const allContinents = useSelector(state=> state.continents)

    //localStates
    const [currentPage, setCurrentPage]= useLocalStorage("currentPage", "");
    const [search, setSearch]= useLocalStorage("search","");

    //useEffect

    useEffect(()=>{
        
        dispatch(getCountries())
        dispatch(getActivities())
        dispatch(getContinents())
       
        
    },[dispatch])

    //Paging

    const countriesInPage= () =>{
        if(search.length === 0 && currentPage === 0) return allCountries.slice(currentPage, currentPage + 9)
        let filteredCountries = allCountries.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()))
        
        if(currentPage === 0){
            return filteredCountries.slice(currentPage, currentPage + 9)
        }
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
        setSearch("")
        setOrderPopulation("")
        setOrderABC("")
        setFilterActivity("all")
        setFilterContinent("all")
        setCurrentPage(0)
    }

    const handleSearch =(e)=>{
        setSearch(e.target.value)
        setCurrentPage(0)
    }
    

    
    
    const[orderABC, setOrderABC] = useLocalStorage("orderABC", "")

    const handleOrderABC = (e)=>{
        dispatch(sortByABC(e.target.value))
        setOrderABC(e.target.value)
        setOrderPopulation("")
        setCurrentPage(0)
    }

    const[orderPopulation, setOrderPopulation] = useLocalStorage("orderPopulation", "")


    const handleOrderPopulation = (e)=>{
        dispatch(sortByPopulation(e.target.value))
        setOrderPopulation(e.target.value)
        setOrderABC("")
        setCurrentPage(0)
    }


    //filters

    const [filterContinent, setFilterContinent] = useLocalStorage("filterContinent","")


    const handleContinentChange =(e)=>{
        dispatch(filterByContinent(e.target.value))
        setFilterContinent(e.target.value)
        setFilterActivity("all")
        setCurrentPage(0)
    }


    const [filterActivity, setFilterActivity] = useLocalStorage("filterActivity","")


    const handleActivityChange =(e)=>{
        dispatch(filterByActivity(e.target.value))
        setFilterActivity(e.target.value)
        setFilterContinent("all")
        setCurrentPage(0)
    }




  return (
<div className='homeContainer'>
    <div className='homeNav'>
    <div className='titleContainer'>
      <NavLink to="/home" className="navTitle">

        <h1 className='titleText'>G </h1>
        <img className='titleImg' src='https://pngpress.com/wp-content/uploads/2020/08/uploads_compass_compass_PNG25585.png' alt='logo'/>
        <h1 className='titleText'> !</h1>
        <p className='titlesubText'>GlobeWiki</p>
      </NavLink>
<div className='sbContainer'>
            <input className='sb' onChange={handleSearch} placeholder="Search Countries..."/>
        </div>  
    </div>
    <div className='allBarsContainer'>
        

        <div className='arrows'>
                    <button className='navPagingButton' onClick={prevPage} disabled={currentPage <= 0}> ← </button>
            <button className='numButton'>{currentPage === 0 ? 0: currentPage.toString().length === 2? currentPage.toString()[0]: currentPage.toString()[0]+currentPage.toString()[1]}</button>
                    <button className='navPagingButton' onClick={nextPage}> → </button>
                </div>

    <div className='orderFilter'>

        <div className='orderContainer'>
       
            <label classname="homeLabel">
            <h3>Order By</h3>
                    <select className="homeSelect" name='order' defaultValue={""} onChange={handleOrderABC}>
                        <option value={""} >ABC</option>
                        <option value= "des">  A-Z  ↓↑</option>
                        <option value= "asc">  Z-A  ↑↓ </option>
                    </select>
                </label>


           

            <label classname="homeLabel">
                <select className="homeSelect" name='population' defaultValue={""} onChange={handleOrderPopulation}>
                    <option value={""} >Population</option>
                    <option value = "high"> More Populated </option>
                    <option value= "low"> Less populated </option>
                </select>
            </label>
        </div>
       
        <div className='filterContainer'>
        <label classname="homeLabel"> 
        <h3>Filter By</h3>
        <select className="homeSelect" name='continent' defaultValue={"all"} onChange={handleContinentChange}>
            <option value="all" >Continent</option>
            {allContinents.map(c=> 
               <option key={c} value={c} name="continent">{c}</option>
           )} 
        </select>
    </label> 

   
    <label classname="homeLabel"> 
        <select className="homeSelect" name='activities' defaultValue={"all"} onChange={handleActivityChange}>
            <option value="all" >Activity Type</option>
            {allActivities.map(a=> 
               <option key={a.id} value={a.name} name="continent">{a.name}</option>
           )} 
        </select>
    </label> 
</div>

        
</div> 

      

        <div className='pagingContainerBar'>
            <NavLink to={"/createActivity"}><button className='pagingButtonBar'>Create Activity</button></NavLink>
            <button className='pagingButtonBar' onClick={handleClick}>Refresh Countries ↺ </button>
        </div>

           
    </div>

    <Footer/>
    </div>
      



    <div className='cardsContainer'>
        {!countriesInPage()[0]?
        <div onClick={()=>setSearch("")}>
            <Loader/>
        </div>
        :
        allCountries === "error"?
            <Return/>
        :

        countriesInPage()?.map(c=>{
            return(
                <div key={c.id} id={c.id} >
                    <NavLink to={`/home/${c.id}`}
                    className="gridCountry"
                    >
                    
                    <Card 
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    flag={c.flag}
                    continent={c.continent}
                    population={c.population? 
                        c.population.toString().length ===10 ? `${c.population.toString()[0]}${c.population.toString()[1]}${c.population.toString()[2]}${c.population.toString()[3]}.${c.population.toString()[4]} Million`:
                        c.population.toString().length ===9 ? `${c.population.toString()[0]}${c.population.toString()[1]}${c.population.toString()[2]}.${c.population.toString()[3]} Million`:
                        c.population.toString().length ===8 ? `${c.population.toString()[0]}${c.population.toString()[1]}.${c.population.toString()[2]} Million`:
                        c.population.toString().length ===7 ? `${c.population.toString()[0]}.${c.population.toString()[1]} Million`:
                    c.population: 0}
     
                    />

                    </NavLink>
                
                </div>
            )
        })
    }
    <div className='pagingContainer'>
    <button className='pagingButton' onClick={prevPage}> ← Previous Page</button>
    <button className='numButton'>{currentPage === 0 ? 0: currentPage.toString().length === 2? currentPage.toString()[0]: currentPage.toString()[0]+currentPage.toString()[1]}</button>
    <button className='pagingButton' onClick={nextPage}>Next Page → </button>

    </div> 

    </div>
 



    </div>
  )
}
