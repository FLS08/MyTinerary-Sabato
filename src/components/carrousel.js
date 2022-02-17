import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { data } from "./data";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/Carrousel.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

console.log(data);
export default function Carrousel() {

  
  return (
    
    
    <>

      
    
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map(img =>
        <SwiperSlide>
          <img src={process.env.PUBLIC_URL + `./images/${img.img}`} />
        </SwiperSlide>
         )}
      </Swiper>
    </>
  );
}