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
        include:[{
                 model: Activity,
                 attributes:["name","dificulty","duration","season"],
                 through:{attributes:[]}
                }]
    })
}

const allCountries = async()=>{
    const api = await getCountries()
    const db = await getDbCountries()
    const all = api.concat(db)
    return all
}


const createActivity = async(name, dificulty, duration, season, countryName)=>{

    const countries = await allCountries();
    let country = countries.find(f=>f.name.toLowerCase() === countryName.toLowerCase())
    
    try {
        const newActivity = await Activity.create({
            name, dificulty, duration, season, countryName
             })



            const findActivity = await Activity.findAll({
                where: {name : name}
            });


            await country.addActivity(findActivity[0].dataValues.id)
            return newActivity
        }
        catch(error){
           console.log(error)
        }
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
        
        console.log(error)
    }
        
})


router.post("/activity", async(req,res)=>{
    const {name, dificulty, duration, season, countryName} = req.body; 
    try {
        const activity = await createActivity(name, dificulty, duration, season, countryName)
        return res.status(200).send(activity)
    } catch (error) {
        return res.status(400).send(error)
    }

})


router.get("/activity", async(req,res)=>{
    try {
        const activities = await Activity.findAll({
            include:[{
                model: Country,
                attributes:["name"],
                through:{attributes:[]}
               }]        
            })
        res.send(activities)
        
    } catch (error) {
        res.send("No activities stored")
    }
})


module.exports = router;


