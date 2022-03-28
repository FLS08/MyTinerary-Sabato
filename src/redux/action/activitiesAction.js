import axios from "axios";


const activitiesAction = {

    fetchActivities: () => {
        return async(dispatch,getState)=>{
            const res = await axios.get('http://localhost:4000/api/activities')
            dispatch({type: 'fetchAct' ,payload:res.data.response}) 
        }  
    },

    fetchActivitiesByItineraryId: (itineraryId) =>{
        console.log(itineraryId)
        return async () => {
            try{const res = await axios.get(`http://localhost:4000/api/activities/${itineraryId}`)
            return {succes:true, response: res.data.response}            
        }
            catch(err){
                console.log(err)
            }
            
        }
    },

 
    

}

export default activitiesAction