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
                flag: c.flags?c.flags[0]: "no flag registered",
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
    const {name, dificulty, duration, season, countryId} = req.body; 
    if(!name || !dificulty || !duration || !season || !countryId){
        return res.status(400).send("Missing required parameters")
    }
    
    try {
        const newActivity = await Activity.create({
            name, dificulty, duration, season, countryId
            })
            res.status(200).json(newActivity)
            const getId = await Activity.findAll({
                where:{name : name}
            })

            const country = await Country.findByPk(countryId);
            await country.addActivity(getId[0].dataValues.id)
    } catch (error) {
        console.log(error)
    }
})

router.get("/activity", async(req,res)=>{
    const activities = await Activity.findAll()
    res.send(activities)
})


module.exports = router;


