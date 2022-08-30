import axios from "axios";
const url = "http://localhost:3001/countries";  


export function getCountries (){
    return async function(dispatch){
        const link = await axios.get(url);
        const resp = link.data;
        return dispatch({
            type: "GET_COUNTRIES",
            payload: resp
        })
    }
}

export function getActivities (){
    return async function(dispatch){
        const link = await axios.get("http://localhost:3001/activity");
        const resp = link.data;
        return dispatch({
            type: "GET_ACTIVITIES",
            payload: resp
        })
    }
}

export function createActiviy (payload){
    return async function(){
        const resp = await axios.post("http://localhost:3001/activity", payload)
        return resp
    }
}


export function getDetail(id){
    return async function(dispatch){
        try{
            var resp = await axios.get( `http://localhost:3001/countries/${id}`)
            return  dispatch({
                type: "GET_DETAIL",
                payload: resp.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function filterByContinent(payload){
    return {
        type:"FILTER_BY_CONTINENT",
        payload
    }
}

export function filterByActivity(payload){
    return {
        type:"FILTER_BY_ACTIVITY",
        payload
    }
}

export function sortByPopulation(payload){
    return {
        type:"SORT_BY_POPULATION",
        payload
    }
}


export function sortByABC(payload){
    return {
        type:"SORT_BY_ABC",
        payload
    }
}