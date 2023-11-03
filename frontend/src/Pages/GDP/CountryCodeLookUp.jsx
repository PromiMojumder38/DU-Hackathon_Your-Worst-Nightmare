// CountryCodeLookup.js

import React, { useState } from 'react';

function CountryCodeLookup({ onCountryCodeChange }) {
  const [countryName, setCountryName] = useState('');

  const handleChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleFetchCountryCode = () => {
    if (countryName) {
      fetch(`https://api.worldbank.org/v2/countries?format=json&per_page=200`)
        .then((response) => response.json())
        .then((data) => {
          const country = data[1].find(
            (country) => country.name.toLowerCase() === countryName.toLowerCase()
          );

          if (country) {
            onCountryCodeChange(country.id);
          } else {
            console.error('Country not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching country code:', error);
        });
    }
  };

  return (
    <div>
      <label>
        Enter Country Name:
        <input type="text" value={countryName} onChange={handleChange} />
      </label>
      <button onClick={handleFetchCountryCode}>Fetch Country Code</button>
    </div>
  );
}

export default CountryCodeLookup;
