

const initialState ={
    countries : [],
    allCountries : [],
    detail:[],
    activities:[]
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

        case "GET_DETAIL":
            return{
                ...state,
                detail:action.payload,
            }

            default:
                return state
        }}    

export default rootReducer;