import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function Details() {
    const [data,setData]=useState([])
    const {id} = useParams()
    const getApi = async () =>{
        await axios.get(`http://localhost:4000/api/cities`)
        .then(response=>{setData(response.data.response.cities);
            console.log(response.data.response.cities);
        }).catch(error=>{console.log(error);})
    }
    const cardDetail = data.filter(elem=> elem._id === id)

  return (

     <div>
        {        
                                  
            <div>                
                <Card className='cards' sx={{ maxWidth: 345 ,ml:6,mr:4}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="300"
                            image={process.env.PUBLIC_URL+`/images/${cardDetail.image}` }
                            alt="img"/>
                        <CardContent>
                            <Typography gutterBottom variant="h6" width={'100%'} component="div">
                                {cardDetail.city}
                            </Typography>
                            <Typography gutterBottom variant="p" width={'100%'} component="div">
                                {cardDetail.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                                     
                </Card>            
            </div>                          
         }
      </div>
   

  )
}

export default Details