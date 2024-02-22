import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home.jsx';
import Signup from '../Pages/Signup.jsx';
import Tracker from '../Pages/Tracker.jsx';
import Login from '../Pages/Login.jsx';



import '../Styles/App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}  />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/tracker' element={<Tracker/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
