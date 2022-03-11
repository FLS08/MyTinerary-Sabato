import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import NotFound from './notFound';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import citiesAction from '../redux/action/citiesAction';






function Cities(props) {

   
 
   

 

  useEffect(()=>{   

    props.fetchCities();
                           
  } ,[])

  const filteredCities = (event)=>{

    props.filterCities(props.cities,event.target.value)
    
  }
  
  //console.log(props)

  
 
  


  return (
    <>
      <div className='cities'>

        <h2>Find your Perfect Tinerary..</h2>
        
        <input 
          className='form-control inputSearch'
          onChange={filteredCities} 
          placeholder='Search any City or Country.. '
        />
        
        
        {props.filtCities.length === 0 ? (<NotFound/>) : props.filtCities?.map(city =>           
                                  
              <div key={city._id}>                
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
                  <Link to={`/details/${city._id}`}>
                    <CardActions>
                        <button className='cardsButton'> Visit!</button>
                    </CardActions>
                  </Link>
              </Card>            
              </div>                          
          )} 

          

      </div>
    </>
  )
}

const mapDispatchToProps = {
  fetchCities:citiesAction.fetchCities,
  filterCities:citiesAction.filterCities
 
}
const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
    filtCities: state.citiesReducer.filtCities
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cities)

