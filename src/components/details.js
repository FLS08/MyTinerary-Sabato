import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import citiesAction from '../redux/action/citiesAction';
import {connect, useSelector} from 'react-redux'







function Details(props) {

    
    let {id} = useParams()
    console.log(id)

    /* const [data,setData]= useState(false) */
    const data = useSelector(store => store.City.city)

    /* const data = props.city */
    console.log(data)

    useEffect(()=>{   

        props.fetchOneCity(id)
                               
    } ,[])


    
    

  return (

     <div>
        {        
                
            
            <div>                
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
      </div>
   

  )
}

const mapDispatchToProps = {
    fetchOneCity: citiesAction.fetchOneCity
}


const mapStateToProps = (state) => {

    
    return {
        cities: state.City.cities,
        aux: state.City.aux,
        city: state.City.city
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)