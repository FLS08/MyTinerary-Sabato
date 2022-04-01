import axios from "axios";


const activitiesAction = {

    fetchActivities: () => {
        return async(dispatch,getState)=>{
            const res = await axios.get('https://mytinerary-sabato.herokuapp.com/api/activities')
            dispatch({type: 'fetchAct' ,payload:res.data.response}) 
        }  
    },

    fetchActivitiesByItineraryId: (itineraryId) =>{
        return async () => {
            try{const res = await axios.get(`https://mytinerary-sabato.herokuapp.com/api/activities/${itineraryId}`)
            return {succes:true, response: res.data.response}            
        }
            catch(err){
                console.log(err)
            }
            
        }
    },

 
    

}

export default activitiesAction