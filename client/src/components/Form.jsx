import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { createActivity, getActivities, getCountries } from '../redux/actions'
import Loader from './Loader'
import Title from "./Title"
import ".././styles.css"
import Footer from "./Footer"


export default function Form(){

    const dispatch = useDispatch()
    const countries = useSelector(state=> state.countries);
    const history = useHistory();

    useEffect(()=>{
        dispatch(getActivities())
        dispatch(getCountries())
        dispatch(createActivity())
    },[dispatch])

    document.title = "Add an Activity!";


    const validate =(input)=>{
        let errors={};
        if(!input.name)errors.name = "Plase name the activity";
        if(!input.dificulty)errors.dificulty = "Plase add a dificulty (1-5)";
        if(!input.duration || input.duration < 1 || input.duration > 24)errors.duration = "Please add the duration (1-24 hs)";
        if(!input.season)errors.season = "Plase select a season";
        if(!input.countryName[0])errors.countryName = "Select at least 1 country";

        return errors
    }

    const [errors,setErrors]=useState({})

    const [input, setInput] = useState({
        name: "",
        dificulty: 0,
        duration: 0,
        season:"",
        countryName:[]
    })

    const [success, setSuccess] = useState("")

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
        if(!input.countryName.includes(e.target.value)){

            setInput({
                ...input,
                countryName:[...input.countryName, e.target.value]
            })
            setErrors(validate({
                ...input,
                countryName:[...input.countryName, e.target.value]
            }))
        }else{
            setInput({
                ...input,
                countryName:[...input.countryName]
            })
            setErrors(validate({
                ...input,
                countryName:[...input.countryName]
            }))
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(createActivity(input))
        setInput({
            name:"",
            dificulty: 0,
            duration: 0,
            season:"",
            countryName:[]
        })
        console.log(input)
        setSuccess( `Activity ${input.name } Created!`)
        history.push("/home")
    }


    const handleSubmitRefresh=(e)=>{
        e.preventDefault();
        dispatch(createActivity(input))
        setInput({
            name:"",
            dificulty: 0,
            duration: 0,
            season:"",
            countryName:[]
        })
        console.log(input)
        setSuccess( `Activity ${input.name } Created!`)
        history.push("/createActivity")
    }


    const deleteCountries =(e)=>{
        e.preventDefault()
        setInput({
            ...input,
            countryName:[...input.countryName.filter(f=>f === e)]
        })
    }

    const deleteCountry =(e)=>{
        e.preventDefault()
        setInput({
            ...input,
            countryName:[...input.countryName.filter(f=>f !== e.target.value)]
        })
    }

    //console.log(input)

  return (
      <div className='formContainer'>
        <Title/>
        {!countries[0]?
    <Loader/>
    :

    
        <form className='formForm'>

            <div className='formTitles'>

            <h1 className='formTitle'>Create Activity</h1>
            {success && (<p className='success'>{success} </p>)}

            </div>

            {/* <p className="formsubTitle">*Please fill all the fields</p> */}


         <div className='formNameContainer'>
            <label className= "labelTitle"> Name:
                <input className='formText' type="text" placeholder='Insert Activity Name..' value={input.name} name="name" onChange={handleChange}/>
                 {errors.name && (<p className='error'>{errors.name}</p>)}
            </label>
            </div>   

        <div className='formDifContainer'>
            <label className= "labelTitle"> Select Dificulty:

                <select className='formDificulty' name='dificulty' defaultValue={3} onChange={handleChange}>
                    <option value={null}>Dificulty 1 to 5</option>

                    <option value={1} name="dificulty">★☆☆☆☆</option>
                    <option value={2} name="dificulty">★★☆☆☆</option>
                    <option value={4} name="dificulty">★★★★☆</option>
                    <option value={5} name="dificulty">★★★★★</option>
                </select>
                    {errors.dificulty && (<p className='error'>{errors.dificulty} </p>)}

            </label>
        </div>
            
        <div className='formDurContainer'>
            <label className= "labelTitle"> Duration 
                <input type="number" min={1} max={24} name="duration" value={input.duration} onChange={handleChange}/> hs
                {errors.duration && (<p className='error'>{errors.duration}</p>)}
            </label>
        </div>

        <div className='formSeasonContainer'>
            <label className= "labelTitle"> Recommended Season:
            <select className='formSeason'  name='season' onChange={handleChange}>
                <option value={null} >Select a season</option>
                <option value={"Summer"} name="season">Summer</option>
                <option value={"Winter"} name="season">Winter</option>
                <option value={"Spring"} name="season">Spring</option>
                <option value={"Fall"} name="season">Fall</option>
            </select>
            {errors.season && (<p className='error'>{errors.season} </p>)}

            </label>
        </div>
            

        <div className='formCountriesContainer'>
            <label className='labelTitle'>Select Country for the Activity
                <select name='countries' onChange={handleCountrySelect}>
                    <option value={null}>Select one or multiple Countries</option>
            {countries?.map(c=>
                            <option key={c.id} value={c.name}> {c.name} </option>
                            )}
                </select>
                {errors.countryName && (<p className='error'>{errors.countryName} </p>)}

            </label>

        <div>
            <h4>Selected Countries</h4>
                <button onClick={deleteCountries} className="formButton2" disabled={!input.countryName[0]}>Delete Selected Countries</button>
            <div className='selectedCountries'>
                {input.countryName?.map(c=>{
                    return(
                        <div className='countriesForm' value={c} key={c.id}>
                            <li value={c}  key={c.id}>{c}</li>
                            <button className='formX' value={c} onClick={deleteCountry}>X</button>
                        </div>
                    )})}

            </div>
        </div>
                    </div>
            
            <div className="formButtons">

                <button className="formButton" onClick={handleSubmit} type='submit' disabled={!input.name || !input.countryName || input.dificulty < 1 ||!input.dificulty > 5 || input.duration < 1 || input.duration >24 || !input.season}>Create and Return Home</button>
                <NavLink to={"/home"}>
                <button className="formButton" type='submit'>Return Home</button>
                </NavLink>
                <button className="formButton" onClick={handleSubmitRefresh} type='submit' disabled={!input.name || !input.countryName || input.dificulty < 1 ||!input.dificulty > 5 || input.duration < 1 || input.duration >24 || !input.season}>Create and Create another One!</button>
            
            </div>

        </form>}
        <Footer/>
    </div>
  )
}
