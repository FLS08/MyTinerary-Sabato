import React from 'react'


function Logo() {
  return (
   <>
        <img src={process.env.PUBLIC_URL+`/images/logo.gif` } alt="logo" id='Logo' />

    </>
  )
}

export default Logo