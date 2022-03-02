import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import NavBar from './components/nav';
import Footer from './components/footer';
import Cities from './components/cities';
import Details from './components/details';



const App = () => {

  
  return (


    <BrowserRouter>
      <div className="App">

        

        <NavBar />

        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/cities" element={<Cities/>}/>
          <Route path='/details/:id' element={<Details/>}/>
    
        </Routes>
        
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;

