import React from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";  
import "swiper/css"; 
import "swiper/css/pagination"; 
import {data} from './data'  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "swiper/css/grid"
// import required modules 
import { Pagination, Autoplay, Grid } from "swiper";   


export default function Carrousel() {   
  
  return (     
    <div className="gallery">       
    <Swiper         
        slidesPerView={2}      
        slidesPerGroup={4}         
        spaceBetween={30}         
        pagination={{           
            clickable: true,         
        }}         
        modules={[Pagination, Autoplay, Grid]}         
        autoplay={{delay: 2000, disableOnInteraction: false }}         
        className="mySwiper"         
        breakpoints={{           
            "@0.00":{             
                slidesPerView: 4,
                spaceBetween: 10,           
            },           
            "@0.75":{             
                slidesPerView: 4,             
                spaceBetween: 10,           
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
        <SwiperSlide>                          
            <div>                
            <Card className='card' sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={process.env.PUBLIC_URL+`/images/${city.img}` }
                    alt="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {city.city}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                       <Button size="small" className='cardButton'> Visit! </Button> 
                </CardActions>
            </Card>            
            </div>          
        </SwiperSlide>                  
        )}       
        </Swiper>     
        </div>   
        ); 
    }