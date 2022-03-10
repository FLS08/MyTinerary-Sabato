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
            try{const res = await axios.get(`http://localhost:4000/api/cities/${id}`)
            dispatch({type: 'fetchOne', payload: res.data.response})
            //console.log(res.data.response)
            return res.data.response
        }
            catch(err){
                console.log(err)
            }
            


        }
    },
    
    deleteOneCity: (id) =>{
        return async (dispatch,getState) =>{
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'deleteCity', payload: res.data.response.cities})

        }
    },

    filterCities: (cities,value)=>{
        return (dispatch, getState)=>{
            dispatch({type: 'filt', payload: {cities,value } })
        }
    }
    

}

export default citiesAction