import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import CoinInfo from "../Components/Coin/CoinInfo/CoinInfo";
import Compare from "../Components/Compare/Compare";
import Dashboard from "../Components/Dashoard/Dashboard";
import LandingPage from "../Components/LandingPage/LandingPage";
import Watchlist from "../Components/Watchlist/Watchlist";

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/dashboard' element={ <Dashboard /> } />
      <Route path='/coin/:coinInfo' element={ <CoinInfo /> } /> 
      <Route path="/compare" element={ <Compare /> } />
      <Route path='/watchlist' element={<Watchlist />} />
    </Routes>
  );
}
