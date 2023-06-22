import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from "./components/auth/Login"
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Landing/>} />
    <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
