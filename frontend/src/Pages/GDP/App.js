// App.js

import React, { useState } from 'react';
import CountryCodeLookup from './CountryCodeLookUp';
import DataTables from './DataTables';

function App() {
  const [countryCode, setCountryCode] = useState('');

  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
  };

  return (
    <div>
      <h1>World Bank Data</h1>
      <CountryCodeLookup onCountryCodeChange={handleCountryCodeChange} />
      {countryCode && <DataTables countryCode={countryCode} />}
    </div>
  );
}

export default App;
