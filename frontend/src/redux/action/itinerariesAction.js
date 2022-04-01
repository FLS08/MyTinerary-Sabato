import axios from "axios";
import {React, useState } from "react";



const itinerariesAction = {


    fetchItineraries: () => {
        return async(dispatch,getState)=>{
            const res = await axios.get('http://localhost:4000/api/itineraries')
            dispatch({type: 'fetch' ,payload:res.data.response}) 
        }  
    },

    fetchOneItinerary: (id) =>{     //FETCH ITINERARIES BY CITY
        return async (dispatch,getState) => {
            try{const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
            dispatch({type: 'fetchOneItinerary', payload: res.data.response})
            
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

     likeDislike:(itineraryId) =>{

        return async () =>{
            try {
                const token = localStorage.getItem("token");
                const res = await axios.put(`http://localhost:4000/api/likeDislike/${itineraryId}`,
                {},
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                })
                return res 
                
            } catch (error) {
                console.log(error)
                
            }

        }
    } 

 
    

}

export default itinerariesAction