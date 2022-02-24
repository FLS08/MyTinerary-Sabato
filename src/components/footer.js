import React from 'react'
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css'



function Footer() {
  return (
    <div className="d-flex flex-column h-100">

    <footer className="w-100 py-4 flex-shrink-0">
        <div className="container py-4">
            <div className="row gy-4 gx-5">
                <div className="col-lg-4 col-md-6">
                    <h5 className="h1 text-white">MT.</h5>
                    <p className="small text-muted">MyTinerary. 7512 Dr Phillips Blvd, Orlando, FL 32819</p>
                    <div>
                      <img src={process.env.PUBLIC_URL+`/images/instagram.png` } alt="insta" className='iconFooter' />
                      <img src={process.env.PUBLIC_URL+`/images/whatsapp.png` } alt="wsp" className='iconFooter' />
                      <img src={process.env.PUBLIC_URL+`/images/facebook.png` } alt="face" className='iconFooter' />
                    </div> 
                    <p className="small text-muted mb-0">&copy; Francisco Sabato - FS 26 - MindHub.</p>
                </div>
               
                <div className="col-lg-2 col-md-6">
                    <h5 className="text-white mb-3">Quick links</h5>
                    <ul className="list-unstyled text-muted">
                      <Link to='/home' className='linkFooter'>
                        <li>Home</li>
                      </Link>
                      <Link to='/cities' className='linkFooter'>
                        <li>Cities</li>
                      </Link>
                        
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5 className="text-white mb-3">Suscribe to our Newsletter</h5>
                  
                    <form action="#">
                        <div className="input-group mb-3">
                            <input className="form-control" type="text" placeholder="johndoe@mail.com" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-primary" id="button-addon2" type="button"><i className="fas fa-paper-plane"></i>Suscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </footer>
</div>
  )
}

export default Footer