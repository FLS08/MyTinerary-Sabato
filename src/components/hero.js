import React from 'react'
import VideoHero from './video/VideoHero.mp4'

function Hero() {
  return (
    <div className='Hero'>
        <video autoPlay loop muted
          style={{
            position: 'relative',  
            width: '100%',
            height:'500px',
            objectFit: 'cover',
            objectPosition: '50%,50%',
            zIndex: '-1'
            }}>
          <source src={VideoHero} type='video/mp4' />
        </video>
        <div className='TextHero'>
          <h1>My Tinerary </h1>
          <p>Find your perfect trip, designed by insiders who know and love their cities!".</p>
        </div>
    
    
    </div>
  )
}

export default Hero