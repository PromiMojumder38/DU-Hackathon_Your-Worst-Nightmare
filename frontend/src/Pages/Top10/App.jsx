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

  return (
    <div className="App">
      <h1>Top 10 Cities by AQI (Air Quality Index)</h1>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>AQI (US)</th>
          </tr>
        </thead>
        <tbody>
          {topCities.map((city, index) => (
            <tr key={index}>
              <td>{city.city}</td>
              <td>{city.aqi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
