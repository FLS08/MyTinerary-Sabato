
const initialState = {

    cities:[],
    city:[],
    aux:[],
    filtCities:[]
}

const citiesReducer = (state= initialState, action)=>{

    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                cities: action.payload,
                aux: action.payload
            }
            case 'deleteCity':
                return {
                    ...state,
                    cities: action.payload,
                }
    
            case 'loadCity':
                let cities = [...state.cities]
                cities.push(action.payload)
                return {
                    ...state,
                    cities,
                    aux:[...cities]
                }
    
            case 'filt':
                const filtered = action.payload.cities.filter((cities => cities.city.toLowerCase()))
    
                return{
                    ...state,
                    filtCities: filtered
                }
            case 'fetchOne':
                return{
                    ...state,
                    city: action.payload

                }
        default:
            return state
    }

}

export default citiesReducer