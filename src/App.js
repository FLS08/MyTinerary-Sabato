import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import NavBar from './components/nav';


const App = () => {
  
  return (


    <BrowserRouter>
      <div className="App">

        
      
        <NavBar />

        <Routes>
          <Route path="*" element={<Home/>}/>
    
        </Routes>
        

      </div>
    </BrowserRouter>
  );
}

export default App;

