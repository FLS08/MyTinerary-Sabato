import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';





function Cities() {

   
  const [data, setData ]= useState([])
  const [search, setSearch]= useState("") 
  const [load, setLoad]= useState([]) 

  const getApi = async () =>{
    await axios.get(`http://localhost:4000/api/cities`)
    .then(response=>{setData(response.data.response.cities);
        setLoad(response.data.response.cities)
        console.log(response.data.response.cities);
    }).catch(error=>{console.log(error);})
}

  useEffect(()=>{   

    getApi();
                           
  } ,[])





  const handleChange = event =>{
    setSearch(event.target.value);
    filt(event.target.value);
  }

  const filt = (searched) => {
    var filtrado = data.filter((elem =>{
      if((elem.city.toString().toLowerCase().startsWith(searched.toLowerCase().trim()) || elem.country.toString().toLowerCase().startsWith(searched.toLowerCase().trim())))
      {
        return elem
      }
      
    }
    
    ));
    setLoad(filtrado)
    
  }


  return (
    <>
      <div className='cities'>

        <h2>Find your Perfect Tinerary..</h2>
        
        <input 
          className='form-control inputSearch'
          value={search}
          onChange={handleChange}
          placeholder='Search any City or Country.. '
        />
        
        {load?.map(city =>           
                                  
              <div>                
              <Card className='cards' sx={{ maxWidth: 345 ,ml:6,mr:4}}>
                  <CardActionArea>
                  <CardMedia
                      component="img"
                      height="300"
                      image={process.env.PUBLIC_URL+`/images/${city.img}` }
                      alt="img"
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h6" width={'100%'} component="div">
                      {city.city}
                      </Typography>
                      <Typography gutterBottom variant="p" width={'100%'} component="div">
                      {city.country}
                      </Typography>
                  </CardContent>
                  </CardActionArea>
                  <CardActions>
                      <button className='cardsButton'> Visit!</button>
                  </CardActions>
              </Card>            
              </div>                          
          )} 

          

      </div>
    </>
  )
}

export default Cities