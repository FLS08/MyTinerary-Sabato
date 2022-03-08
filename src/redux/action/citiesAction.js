import axios from "axios";


const citiesAction = {

    fetchCities: () => {
        return async(dispatch,getState)=>{
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'fetch' ,payload:res.data.response.cities}) 
        }  
    },

    fetchOneCity: (id) =>{
        return async (dispatch,getState) => {
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'fetchOne', payload: res.data.response.cities})


        }
    },
    
    deleteOneCity: (id) =>{
        return async (dispatch,getState) =>{
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'deleteCity', payload: res.data.response.cities})

        }
    }
    

    



}

export default citiesAction