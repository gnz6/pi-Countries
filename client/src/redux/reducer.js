

const initialState ={
    countries : [],
    allCountries : [],
    detail:[],
    activities:[],
    // continents:["Europe", "Oceania", "North America", "South America", "Asia", "Africa", "Antarctica"],
    continents:[],
    mundialist:["Germany", "Qatar", "Brazil", "France", "Belgium", "Serbia","Spain", "Crotatia", "Switzerland","England","United Kingdom", "Netherlands", "Argentina", "Iran", "South Korea", "Saudi Arabia", "Japan", "Uruguay", "Ecuador", "Canada", "Ghana", "Senegal", "Poland", "Portugal", "Tunisia", "Morocco", "Cameroon", "United States", "Mexico", "Wales", "Australia", "Costa Rica"]

}

const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries:action.payload,
                allCountries: action.payload
            }
    

        case "GET_ACTIVITIES":
                    return{
                        ...state,
                        activities:action.payload,
                    }

        case "GET_CONTINENTS":
            return{
                ...state,
                continents: action.payload
            }

        case "GET_DETAIL":
            return{
                ...state,
                detail:action.payload,
            }

            case "SORT_BY_ABC":
            let letterOrder = action.payload === "des"?
                state.countries.sort((a,b)=>{
                    if(a.name > b.name) return 1
                    if(b.name > a.name) return -1
                    return 0
                }):
                state.countries.sort((a,b)=>{
                    if(a.name < b.name) return 1
                    if(b.name < a.name) return -1
                    return 0
                    }) 
            
            return{
                ...state, letterOrder
            }

            case "SORT_BY_POPULATION":
                let populationOrder = action.payload === "low"?
                state.countries.sort((a,b)=>{
                    if(a.population > b.population) return 1
                    if(b.population > a.population) return -1
                    return 0
                }):
                state.countries.sort((a,b)=>{
                    if(a.population < b.population) return 1
                    if(b.population < a.population) return -1
                    return 0
                    }) 
            
            return{
                ...state, populationOrder
            }

            case "FILTER_BY_CONTINENT":

            const allCountries = state.allCountries;
            let countryContinent = action.payload === "all" ? allCountries : allCountries.filter(c => c.continent.includes(action.payload))
            if(!countryContinent[0]) countryContinent = "error"

        return{
            ...state,
            countries: countryContinent
        }

        case "FILTER_BY_ACTIVITY":

            const countries = state.allCountries;
            const nonEmpty = countries.filter(country=> country.activities.length >0 )
            const nonEmpty2 = nonEmpty.filter(c=> c.activities[0].name.includes(action.payload))
            let countyActivity = action.payload === "all" ? countries : nonEmpty2
            if(!countyActivity[0]) countyActivity = "error"
        
        return{
            ...state,
            countries: countyActivity
        }



            default:
                return state
        }}    

export default rootReducer;