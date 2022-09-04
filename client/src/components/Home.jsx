import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom';
import { filterByActivity, filterByContinent, getActivities, getContinents, getCountries, sortByABC, sortByPopulation } from '../redux/actions';
import Card from './Card';
import Loader from './Loader';
import ".././styles.css"
import Title from './Title';
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
        
        const filteredCountries = allCountries.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()))
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
    // const[order, setOrder]= useLocalStorage("order" ,"");
    // const[order, setOrder]= useLocalStorage({
    //     orderAbc: ("abc", ""),    
    //     orderPop: ("pop", ""),   
    //     orderContinent: ("continent", ""),    
    //     orderActivity: ("activity", "")    
    // });


    const [orderAbc, setorderAbc]= useLocalStorage("orderAbc","");

    const handleOrderABC = (e)=>{
        dispatch(sortByABC(e.target.value))
        setorderAbc(e.target.value)
        setorderPop("")
        setorderContinent("")
        setorderActivity("")
        setCurrentPage(0)
    }

    const [orderPop, setorderPop]= useLocalStorage("orderPop","");


    const handleOrderPopulation = (e)=>{
        dispatch(sortByPopulation(e.target.value))
        setorderPop(e.target.value)
        setorderAbc("")
        setorderContinent("")
        setorderActivity("")
        setCurrentPage(0)
    }



    //filters

    const [orderContinent, setorderContinent]= useLocalStorage("orderContinent","");


    const handleContinentChange =(e)=>{
        dispatch(filterByContinent(e.target.value))
        setorderContinent(e.target.value)
        setorderActivity("")
        setorderPop("")
        setorderAbc("")

        setCurrentPage(0)

    }

    const [orderActivity, setorderActivity]= useLocalStorage("orderActivity", "");


    const handleActivityChange =(e)=>{
        dispatch(filterByActivity(e.target.value))
        setorderActivity(e.target.value)
        setorderContinent("")
        setorderPop("")
        setorderAbc("")
        setCurrentPage(0)
    }





  return (
    <div className='homeContainer'>
        <Title/>

    <div className='allBarsContainer'>

    <div className='orderFilter'>

        <div className='orderContainer'>
            <h3>Order By</h3>
       
                <label>Alphabet:
                    <select className="homeSelect" name='order' defaultValue={null} onChange={handleOrderABC}>
                        <option value={null} >ABC</option>
                        <option value= "des">  A-Z  ↓↑</option>
                        <option value= "asc">  Z-A  ↑↓ </option>
                    </select>
                </label>


            <label>Population:
                <select className="homeSelect" name='population' defaultValue="default" onChange={handleOrderPopulation}>
                    <option value={null} >Population</option>
                    <option value = "high"> More Populated </option>
                    <option value= "low"> Less populated </option>
                </select>
            </label>
        </div>
       
        <div className='filterContainer'>
        <h3>Filter By</h3>
        <label> Continent:
        <select className="homeSelect" name='continent' defaultValue={"all"} onChange={handleContinentChange}>
            <option value="all" >Anywhere</option>
            {allContinents.map(c=> 
               <option key={c} value={c} name="continent">{c}</option>
           )} 
        </select>
    </label> 


   
    <label> Activities:
        <select className="homeSelect" name='activities' defaultValue={"all"} onChange={handleActivityChange}>
            <option value="all" >Anywhere</option>
            {allActivities.map(a=> 
               <option key={a.id} value={a.name} name="continent">{a.name}</option>
           )} 
        </select>
    </label> 
</div>

        
</div> 
        

        <div className='pagingContainer'>
            <button className='pagingButton' onClick={prevPage}> ← Previous Page</button>
            <button className='pagingButton' onClick={handleClick}>Reload Countries ↺ </button>
            <NavLink to={"/createActivity"}><button className='pagingButton'>Create Activity</button></NavLink>
            <button className='pagingButton' onClick={nextPage}>Next Page → </button>
        </div>

    </div>


      

        <div className='sbContainer'>
            <input className='sb' onChange={handleSearch} placeholder="Search Countries..."/>
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
                    population={c.population}
                    />

                    </NavLink>
                
                </div>
            )
        })
    }


    </div>

    <div className='pagingContainer'>
    <button className='pagingButton' onClick={prevPage}> ← Previous Page</button>
    <h3 className='numButton'>{currentPage === 0 ? 0: currentPage.toString().length == 2? currentPage.toString()[0]: currentPage.toString()[0]+currentPage.toString()[1]}</h3>
    <button className='pagingButton' onClick={nextPage}>Next Page → </button>

    </div>

    <Footer/>

    </div>
  )
}
