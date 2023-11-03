// App.js

import React, { useState } from "react";
import CountryCodeLookup from "./CountryCodeLookUp";
import DataTables from "./DataTables";
import { useParams } from "react-router-dom";

function App() {
  const { countryName } = useParams();
  const [countryCode, setCountryCode] = useState("");

  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
  };

  return (
    <div>
      <h1>World Bank Data</h1>
      <CountryCodeLookup onCountryCodeChange={handleCountryCodeChange} countryName={countryName} />
      {countryCode && (
        <DataTables countryCode={countryCode} countryName={countryName} />
      )}
    </div>
  );
}

export default App;
