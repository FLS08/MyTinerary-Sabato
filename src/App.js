import React,{useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import NavBar from './components/nav';
import Footer from './components/footer';
import Cities from './components/cities';
import Details from './components/details';
import SignIn from '../src/components/signs/singIn'
import SignUp from '../src/components/signs/singUp';
import Snackbar from '../src/components/signs/snackbar';
import {connect} from 'react-redux'
import userActions from './redux/action/userAction';


const App = (props) => {

  useEffect(() => {
 
    if(localStorage.getItem('token')!== null){
      const token = localStorage.getItem("token")
      props.VerifyToken(token)
    }
   },[])
  
  return (


    <BrowserRouter>
      <div className="App">

   

        <NavBar />
        <Snackbar/>

        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/cities" element={<Cities/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          {!props.user &&<Route path="/auth/signin" element={<SignIn/>} />}    
          {!props.user &&<Route path="/auth/signup" element={<SignUp />} />}    
        </Routes>
        
        <Footer />

      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = {
	VerifyToken: userActions.VerifyToken,

}

export default connect(null, mapDispatchToProps)(App);

