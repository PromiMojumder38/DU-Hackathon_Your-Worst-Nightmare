import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [topCities, setTopCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/top-cities')
      .then((response) => {
        setTopCities(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top cities:', error);
        console.error('Error message:', error.message);
        console.error('Error status code:', error.response?.status);
      });
  }, []);

  // Define an inline CSS object
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '50%',
    margin: '0 auto',
  };

  const cellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const oddRowStyle = {
    backgroundColor: '#fff',
  };

  return (
    <div className="App">
      <h1 style={{ color: '#333' }}>Top 10 Cities by AQI (Air Quality Index)</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>City</th>
            <th style={cellStyle}>AQI (US)</th>
          </tr>
        </thead>
        <tbody>
          {topCities.map((city, index) => (
            <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td style={cellStyle}>{city.city}</td>
              <td style={cellStyle}>{city.aqi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
