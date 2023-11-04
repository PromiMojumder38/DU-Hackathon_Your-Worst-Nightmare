import React, { useState } from 'react';

function CountryCodeLookup({ onCountryCodeChange, countryName }) {
  const [inputCountryName, setInputCountryName] = useState(countryName || '');

  const handleChange = (e) => {
    setInputCountryName(e.target.value);
  };

  const handleFetchCountryCode = () => {
    if (inputCountryName) {
      fetch(`https://api.worldbank.org/v2/countries?format=json&per_page=200`)
        .then((response) => response.json())
        .then((data) => {
          const country = data[1].find(
            (country) => country.name.toLowerCase() === inputCountryName.toLowerCase()
          );

          if (country) {
            onCountryCodeChange(country.id, inputCountryName); // Pass both countryCode and countryName
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
        <input type="text" value={inputCountryName} onChange={handleChange} />
      </label>
      <button onClick={handleFetchCountryCode}>Fetch Country Code</button>
    </div>
  );
}

export default CountryCodeLookup;