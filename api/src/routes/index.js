const { Router } = require('express');
const axios = require("axios");
const router = Router();
const Sequelize = require("sequelize");
const { where } = require('sequelize');
const {Op} = Sequelize.Op;
const {Country, Activity, Country_Activity} = require("../db");
const restCountries = "https://restcountries.com/v3/all";


//Controllers


const getCountries = async()=>{
    const url = await axios.get(restCountries);
    const resp = url.data;
    try {
        let results = resp.map(c=>{
            return{
                name: c.name.common?c.name.common: c.name.official,
                id: c.cca3? c.cca3: c.cioc,
                flag: c.flags[0]?c.flags[0]: c.flags[1],
                continent: c.continents?c.continents[0]: "no continent registered",
                capital: c.capital? c.capital[0]: "no capital registered",
                subregion: c.subregion? c.subregion: "no subregion registered",
                area: c.area? c.area: 0,
                population: c.population?c.population: 0
            }
        })
    
           return results
    } catch (error) {
        console.log(error)
    }
}
 
const getDbCountries = async()=>{
    return await Country.findAll({
        include:{
            model: Activity,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
}

const allCountries = async()=>{
    const api = await getCountries()
    const db = await getDbCountries()
    const all = api.concat(db)
    return all
}


router.get("/countries", async(req, res)=>{
    const {name} = req.query;
    const countries = await allCountries();
    try {
        if(name){
            let filter = countries.filter(f=> f.name.toLowerCase().includes(name.toLowerCase()));
            return res.status(200).send(filter)
        }
        if(!name) return res.status(200).send(countries)
       }
    catch (error) {
        res.send(error)
    }
})




router.get("/countries/:id", async(req, res)=>{
    const {id}= req.params;
    const country = await allCountries();
    try {
        if(id && id.length === 3){
        let countryId = await country.find(c=> c.id.toUpperCase() === id.toUpperCase())
        res.status(200).send(countryId)
    }   else{
        res.status(404).send("No country was found")
        
    }
    } catch (error) {
        
        res.status(404).send("No country was found")
    }
        
})



//POST


router.post("/activity", async(req,res)=>{
    const {name, dificulty, duration, season, countries} = req.body; 
   
    
    try {
        const newActivity = await Activity.create({
            name, dificulty, duration, season, countries
             })

            const findActivity = await Country.findAll({
                where: {name : countries}
            });

            newActivity.addCountries(findActivity)
            return res.status(200).send(`Activity ${name} added.`)
        }
        catch(error){
            console.log(error)
           // res.status(400).send("Cant create that activity")
        }})


router.get("/activity", async(req,res)=>{
    try {
        const activities = await Activity.findAll({
            include: Country
        })
        res.send(activities)
        
    } catch (error) {
        res.send("No activities stored")
    }
})


module.exports = router;


