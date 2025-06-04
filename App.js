import React from 'react';
import './App.css';
import Register from './Register';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />


        
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
