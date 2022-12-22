import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../Components/LandingPage/LandingPage'

export default function Pages() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <LandingPage /> }  />
        </Routes>
    </BrowserRouter>
  )
}
