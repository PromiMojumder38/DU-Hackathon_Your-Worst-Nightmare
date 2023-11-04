import React, { useState } from "react";
import CountryCodeLookup from "./CountryCodeLookUp";
import DataTables from "./DataTables";
import { useParams } from "react-router-dom";

const appStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f0f0f0",
  padding: "20px",
};

function App() {
  const { countryName } = useParams();
  const [countryCode, setCountryCode] = useState("");

  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
  };

  return (
    <div style={appStyle}>
      <h1>World Bank Data</h1>
      <CountryCodeLookup onCountryCodeChange={handleCountryCodeChange} countryName={countryName} />
      {countryCode && (
        <DataTables countryCode={countryCode} countryName={countryName} />
      )}
    </div>
  );
}

export default App;
