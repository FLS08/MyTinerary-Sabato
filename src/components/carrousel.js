import React from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";  
import "swiper/css"; 
import "swiper/css/pagination"; 
import {data} from './data'  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import "swiper/css/grid"
// import required modules 
import { Pagination, Autoplay, Grid } from "swiper";   


export default function Carrousel() {   
  
  return (     
    <div className="carrousel">
    <h2>Popular MyTineraries</h2>       
    <Swiper         
        slidesPerView={2}      
        slidesPerGroup={4}         
        spaceBetween={30}         
        pagination={{           
            clickable: true,         
        }}         
        modules={[Pagination, Autoplay, Grid]}         
        autoplay={{delay: 2800, disableOnInteraction: false }}         
        className="swiper"         
        breakpoints={{           
            "@0.00":{             
                slidesPerView: 1,
                spaceBetween: 5,
                          
            },
            "@0.50":{             
                slidesPerView: 2,             
                spaceBetween: 5,           
            },           
            "@0.75":{             
                slidesPerView: 3,             
                spaceBetween: 5,           
            },           
            "@1.00":{             
                slidesPerView: 4,             
                spaceBetween: 10,
            },
            "@1.50":{             
                slidesPerView: 4,             
                spaceBetween: 10,           
            }         
        }}       
        >          
        {data.map(city =>           
        <SwiperSlide className='swiperS'>                          
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
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <button className='cardsButton'> Visit!</button>
                </CardActions>
            </Card>            
            </div>          
        </SwiperSlide>                  
        )}       
        </Swiper>     
        </div>   
        ); 
    }