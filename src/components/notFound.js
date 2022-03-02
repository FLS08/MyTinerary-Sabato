import React from 'react'


function NotFound() {
  return (
   <>

            <img src={process.env.PUBLIC_URL+`/images/noresults.gif` } alt="noresults" id='noresults' />
        
    </>
  )
}

export default NotFound