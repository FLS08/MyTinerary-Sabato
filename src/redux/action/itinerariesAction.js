import axios from "axios";


const itinerariesAction = {

    fetchItineraries: () => {
        return async(dispatch,getState)=>{
            const res = await axios.get('http://localhost:4000/api/itineraries')
            dispatch({type: 'fetch' ,payload:res.data.response}) 
        }  
    },

    fetchOneItinerary: (id) =>{
        //console.log(id)
        return async (dispatch,getState) => {
            try{const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
            dispatch({type: 'fetchOneItinerary', payload: res.data.response})
            //console.log(res.data)
            
        }
            catch(err){
                console.log(err)
            }
            


        }
    },
    
    deleteOneItinerary: (id) =>{
        return async (dispatch,getState) =>{
            const res = await axios.get('http://localhost:4000/api/itineraries')
            dispatch({type: 'deleteItinerary', payload: res.data.response.itineraries})

        }
    },

    filterItineraries: (itineraries,value)=>{
        return (dispatch, getState)=>{
            dispatch({type: 'filt', payload: {itineraries,value } })
        }
    }
    

}

export default itinerariesAction