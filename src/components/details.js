import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import itineraryDetails from './itineraryDetails';

/*IMPORTS FROM REDUX  */
import citiesAction from '../redux/action/citiesAction';
import itinerariesAction from '../redux/action/itinerariesAction';
import {connect, useSelector} from 'react-redux'
import ItineraryDetails from './itineraryDetails';









function Details(props) {
    
    let {id} = useParams()
    //console.log(id)

    /* const [data,setData]= useState(false) */
    const data = useSelector(store => store.citiesReducer.city)

    /* const data = props.city */
    //console.log(data)

    useEffect(()=>{   

        props.fetchOneCity(id)
        //console.log(props)
                               
    },[])

    


    
    

  return (

     <div>
        {        
                
            
            <div className='detailsIMG'>                   {/* data area */}

                                
                  {data && <Card className='cards' sx={{ maxWidth: 768 ,ml:4,mr:4}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="300"
                            image={process.env.PUBLIC_URL+`/images/${data.img}` }
                            alt="img"/>
                        <CardContent>
                            <Typography gutterBottom variant="h6" width={'100%'} component="div">
                                {data.city}
                            </Typography>
                            <Typography gutterBottom variant="p" width={'100%'} component="div">
                                {data.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                                     
                </Card>}           
            </div>                          
         }

        <div className='itinerariesArea'>                       {/* Itineraries area */}
            <ItineraryDetails />
        </div>

      </div>
   

  )
}

const mapDispatchToProps = {
    fetchOneCity: citiesAction.fetchOneCity
}


export default connect(null, mapDispatchToProps)(Details)