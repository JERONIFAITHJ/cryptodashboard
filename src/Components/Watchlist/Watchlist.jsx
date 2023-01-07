import React from 'react'
import Dashboard from '../Dashoard/Dashboard'

export default function Watchlist() {
    const obj = {
        watch: true,
        localData: JSON.parse(localStorage.getItem('coinInfo')) || []
    }
  return (
    <Dashboard watchlist={obj} />
  )
}
