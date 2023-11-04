import React, { useState } from 'react';

const inputStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '8px',
};

const buttonStyle = {
  padding: '8px 16px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

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
        <p style={{ textAlign: "left" }}>Enter Country Name:</p>
        <input type="text" value={inputCountryName} onChange={handleChange} style={inputStyle} />
      </label>
      <button onClick={handleFetchCountryCode} style={buttonStyle}>
        Fetch Country Code
      </button>
    </div>
  );
}

export default CountryCodeLookup;
