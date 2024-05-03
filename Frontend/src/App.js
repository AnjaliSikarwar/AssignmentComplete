import React from 'react'
import backgroundImage from '../src/assets/bg-3.jpg'; 
import Login from './Login'
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  return (
    <>
      <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App