import React, { useEffect, useState } from 'react'
/* IMPORTS FROM REDUX */
import { connect } from 'react-redux'
import activitiesAction from '../redux/action/activitiesAction'

function Activities(props) {

    //console.log(props)

    const [activities, setActivities] = useState([])

    useEffect(() => {
    
      props.fetchActivitiesByItineraryId(props.itineraryId)
      .then(res => setActivities(res.response))
    
    }, [props.itineraryId])

    console.log(activities)

  



    return (
        <div>
            {activities?.map(activity =>
              <>
                <div> 
                  <h5>{activity.activityName}</h5>
                </div>
                <div >
                  <img src={activity.activityImage} alt="Activity Photo" className='activityImage' />
                  <p>{activity.place}</p>
                </div>
              </>  
            )}
            

        </div>
    )
}

const mapDispatchToProps = {
    fetchActivitiesByItineraryId: activitiesAction.fetchActivitiesByItineraryId,
  }

export default connect(null,mapDispatchToProps)(Activities)