import React from "react";

import Home from "./components/Home/Home";
//import "bootstrap/dist/css/bootstrap.min.css";
// import Student from "./components/CRUD/practice";
// import Create from "./components/CRUD/CreateStudent";
// import Update from "./components/CRUD/UpdateStudent";

import Owner from "./Pages/AQIDetails/index";

import MoneyShow from "./Pages/MoneyShow/index";


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/owner" element={<Owner />}></Route>
        <Route path="/moneyShow" element={<MoneyShow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
