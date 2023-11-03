import React from "react";
import Home from "./components/Home/Home";
import AQI from "./Pages/AQIDetails/index";
import Top from "./Pages/Top10/App";
import Ph from "./Pages/PhValues/index";
import Map from "./Pages/map/index";
import Gdp from "./Pages/GDP/CountryCodeLookUp";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aqi" element={<AQI />}></Route>
        <Route path="/top" element={<Top />}></Route>
        <Route path="/ph" element={<Ph />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/gdp" element={<Gdp />}></Route>

        <Route path="/app/:countryName" element={<Gdp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
