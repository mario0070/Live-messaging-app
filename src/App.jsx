import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from "./pages/landingpage"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"

function App() {

  return (
    <Routes>
      <Route element={<Landing/>} path='/'/>
      <Route element={<Login/>} path='/login'/>
      <Route element={<Register/>} path='/register'/>
      <Route element={<Dashboard/>} path='/dashboard'/>
    </Routes>
  )
}

export default App
