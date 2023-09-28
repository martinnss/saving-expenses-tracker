import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Summarize from '../Pages/Summarize'
import AudioRecorder from '../Pages/AudioRecorder';
import Login from '../Pages/Login';

import '../Styles/App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}  />
        <Route exact path='/summarize' element={<Summarize/>} />
        <Route exact path='/audio' element={<AudioRecorder/>} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
