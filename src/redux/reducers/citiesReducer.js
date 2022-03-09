
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
                aux: action.payload,
                filtCities: action.payload
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
                console.log(action)
                const filtered = action.payload.cities.filter((cities => cities.city.toLowerCase().startsWith(action.payload.value.toLowerCase().trim())))
                
    
                return{
                    ...state,
                    filtCities: filtered,

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