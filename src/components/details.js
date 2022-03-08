import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import citiesAction from '../redux/action/citiesAction';
import {connect} from 'react-redux'






function Details(props) {

    let {id} = useParams()
    
    const [data,setData]= useState({element: props.cities.find(city => city._id.toString() === id)})

    useEffect(()=>{
        if(props.cities.length < 1){
            props.fetchOneCity(id)
            .then(city => setData({element: city}))
        }
    }, [])

    if (!data.element){
        return <h3>Anda Bien</h3>
    }
    
    console.log(data)

  return (

     <div>
        {        
                
            
            <div>                
                <Card className='cards' sx={{ maxWidth: 768 ,ml:4,mr:4}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="300"
                            image={process.env.PUBLIC_URL+`/images/${data.element.img}` }
                            alt="img"/>
                        <CardContent>
                            <Typography gutterBottom variant="h6" width={'100%'} component="div">
                                {data.element.city}
                            </Typography>
                            <Typography gutterBottom variant="p" width={'100%'} component="div">
                                {data.element.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                                     
                </Card>            
            </div>                          
         }
      </div>
   

  )
}

const mapDispatchToProps = {
    fetchCities: citiesAction.fetchCities,
    fetchOneCity: citiesAction.fetchOneCity
}


const mapStateToProps = (state) => {

    
    return {
        cities: state.City.cities,
        aux: state.City.aux
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)