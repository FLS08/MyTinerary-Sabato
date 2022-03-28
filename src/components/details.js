import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'


/*IMPORTS FROM REDUX  */
import {connect, useDispatch, useSelector} from 'react-redux'
import ItineraryDetails from './itineraryDetails';
import itinerariesAction from '../redux/action/itinerariesAction';









function Details(props) {

    const [reload, setReload] = useState(false);

    let {id} = useParams()
    console.log(id)
    
    const data = useSelector(store => store.itinerariesReducer.itinerary) //Test of useSelector hook


    useEffect(()=>{   
        props.fetchOneItinerary(id)
        
 
    },[reload])

    
    
    //console.log(props);
    
    return (

     <div className='details'>
        

        
                              
        {data.length> 0? data.map( itinerary => <ItineraryDetails className='itinerariesArea' data={itinerary} reload={reload} setReload={setReload}   />):<h1 className='noresults'>No results</h1>}   {/* Itineraries area */}

        

      </div>
   

  )
}



const mapDispatchToProps = {
    fetchOneItinerary: itinerariesAction.fetchOneItinerary,

}




export default connect(null, mapDispatchToProps)(Details)