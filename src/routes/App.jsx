import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Tracker from '../Pages/Tracker';

import '../Styles/App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}  />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/tracker' element={<Tracker/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
