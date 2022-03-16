import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import NavBar from './components/nav';
import Footer from './components/footer';
import Cities from './components/cities';
import Details from './components/details';
import SignIn from './components/SingUp/singIn'
import SignUp from './components/SingUp/singUp';



const App = (props) => {

  
  return (


    <BrowserRouter>
      <div className="App">

        

        <NavBar />

        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/cities" element={<Cities/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          <Route path="/auth/signin" element={<SignIn />} />
				  <Route path="/auth/signup" element={<SignUp />} />
    
        </Routes>
        
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;

