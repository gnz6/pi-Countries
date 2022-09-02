const { Router } = require('express');
const axios = require("axios");
const router = Router();
const Sequelize = require("sequelize");
const { where } = require('sequelize');
const {substring} = Sequelize.Op;
const {Country, Activity} = require("../db");
const restCountries = "https://restcountries.com/v3/all";


//Controllers

router.get("/countries", async(req, res)=>{
    const {name} = req.query;
    try {
        const countries = await Country.findAll({
            include:[{
                model: Activity,
                attributes:["name","dificulty","duration","season"],
                through:{attributes:[]}
               }]
    })

    if(!name && !countries.length){
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
    
        const response =  await Country.bulkCreate(results);
        return res.status(200).send(response)

    } catch (error) {
        console.log(error)
    }
    }
    if(name && countries.length){
        try{
        const country = await Country.findAll({
            where: {
                name :{[substring]: name}},
            include:[{
                model: Activity,
                attributes:["name","dificulty","duration","season"],
                through:{attributes:[]}
               }]
        })
        return res.status(200).send(country)
    }
        catch(error){
            console.log(error)
        return res.status(400).send("No country matches that name")
        }
    }if(!name && countries.length){
        res.status(200).send(countries)
    }
        
    } catch (error) {
        console.log(error)
    }
})



router.post("/activity", async(req, res)=>{
    const {name, dificulty, duration, season, countryName} = req.body;
    if(!name||!dificulty|!duration||!season||!countryName)return res.status(404).send("Missing parameters")
    try {
        const newActivity = await Activity.create({
            name, dificulty, duration, season, countryName
        })

        const findActivity = await Activity.findOne({
            where : { name : name}
        })


      const country = await Country.findAll({
        where: {name: countryName}})
        // include:[{
        //              model: Activity,
        //              attributes:["name","dificulty","duration","season"],
        //              through:{attributes:[]}
        //             }]
        //         })
            
      let countries = await country.map(c=>c.dataValues)
        console.log(countries)

        await findActivity.addCountries(countries);

            return res.status(200).send(newActivity)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})



router.get("/countries/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        const country = await Country.findByPk(id,
            {include:[{
                model: Activity,
                attributes:["name","dificulty","duration","season"],
                through:{attributes:[]}
               }]
            })
            return res.status(200).send(country)
    } catch (error) {
        res.status(400).send(error)
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
        return res.status(200).send(activities)
        
    } catch (error) {
       return res.status(400).send("No activities stored")
    }
})

router.get("/continents", async(req, res)=>{
    try {
        const countries = await Country.findAll();
        const continents = new Set( countries.map((c)=> c.continent))
        let allContinents = [];
        continents.forEach(c=> allContinents.push(c))      

        res.status(200).send(allContinents)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;


