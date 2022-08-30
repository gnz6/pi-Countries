import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { createActiviy, getActivities, getCountries } from '../redux/actions'

export default function Form(){

    const dispatch = useDispatch()
    const countries = useSelector(state=> state.countries)

    useEffect(()=>{
        dispatch(getActivities())
        dispatch(getCountries())
    },[dispatch])

    document.title = "Add an Activity!";


    const validate =(input)=>{
        let errors={};
        if(!input.name)errors.name = "Plase name the activity";
        if(!input.dificulty)errors.dificulty = "Plase add a dificulty (1-5)";
        if(!input.duration)errors.duration = "Please add the duration (1-24 hs)";
        if(!input.season)errors.season = "Plase select a season";
        if(!input.countries)errors.countries = "Select at least 1 country";

        return errors
    }

    const [errors,setErrors]=useState({})
    const history = useHistory();

    const [input, setInput] = useState({
        name: "",
        dificulty: 0,
        duration: 0,
        season:"",
        countries:[]


    })

    //handlers

    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    const handleCountrySelect=(e)=>{
        setInput({
            ...input,
            countries:[...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            countries:[...input.countries, e.target.value]
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createActiviy(input))
        setInput({
            name:"",
            dificulty: 0,
            duration: 0,
            season:"",
            countries:[]
        })
        console.log(input)
        history.push("/home")
    }

    const deleteCountries =(e)=>{
        e.preventDefault()
        setInput({
            ...input,
            countries:[...input.countries.filter(f=>f === e)]
        })
    }


  return (
    <div className='formContainer'>
        {!countries[0]?
        <h1>LOADER</h1>
        :

    
        <form onSubmit={handleSubmit}>

            <h2>CREATE</h2>

         <div className='formNameContainer'>
            <label className= "labelTitle"> Name:
                <input type="text" placeholder='Insert Activity Name..' value={input.name} name="name" onChange={handleChange}/>
                 {errors.name && (<p className='error'>{errors.name}</p>)}
            </label>
            </div>   

        <div className='formDifContainer'>
            <label className= "labelTitle"> Select Dificulty(1 - Easier, 5 - Harder):

                <select className='formDificulty' name='dificulty' defaultValue={3} onChange={handleChange}>
                    <option disabled>Dificulty 1 to 5</option>
                    <option value={1} name="dificulty">★☆☆☆☆</option>
                    <option value={2} name="dificulty">★★☆☆☆</option>
                    <option value={4} name="dificulty">★★★★☆</option>
                    <option value={5} name="dificulty">★★★★★</option>
                </select>
                    {errors.dificulty && (<p className='error'>{errors.dificulty} </p>)}

            </label>
        </div>
            
        <div className='formDurContainer'>
            <label className= "labelTitle"> Duration(Hours from 1 to 24)
                <input type="number" name="duration" value={input.duration} onChange={handleChange}/>
                {errors.duration && (<p className='error'>{errors.duration}</p>)}
            </label>
        </div>

        <div className='formSeasonContainer'>
            <label className= "labelTitle"> Recommended for:
            <select className='formSeason' name='season' onChange={handleChange}>
                <option disabled>Select a season</option>
                <option value={"Summer"} name="season">Summer</option>
                <option value={"Winter"} name="season">Winter</option>
                <option value={"Spring"} name="season">Spring</option>
                <option value={"Fall"} name="season">Fall</option>
            </select>
            {errors.season && (<p className='error'>{errors.season} </p>)}

            </label>
        </div>
            

        <div className='formCountriesContainer'>
            <label >Select Country for the Activity
                <select name='countries' onChange={handleCountrySelect}>
                    <option disabled>Select Country/ies</option>
            {countries?.map(c=>
                            <option key={c.id} value={c.name}> {c.name} </option>
                            )}
                </select>
            </label>
        </div>
            
            <div className="formButtons">

                <button type='submit'>Create Activity!</button>
                <NavLink to={"/home"}>
                <button type='submit'>Return Home</button>
                </NavLink>
            
            </div>
        </form>}
        
    </div>
  )
}
