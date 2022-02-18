import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home';
import NavBar from './components/nav';
import {data} from './components/data'


const App = () => {
  
  console.log(data.map(element => element.city))
  return (


    <BrowserRouter>
      <div className="App">

        
      
        <NavBar />

        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/cities" element={<Cities/>}/> */}


        </Routes>
        

      </div>
    </BrowserRouter>
  );
}

export default App;
