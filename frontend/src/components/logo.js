import React from 'react'
import {Link} from 'react-router-dom'


function Logo() {
  return (
   <>
        <Link to="home">
            <img src={process.env.PUBLIC_URL+`/images/logo.gif` } alt="logo" id='Logo' />
        </Link>
    </>
  )
}

export default Logo