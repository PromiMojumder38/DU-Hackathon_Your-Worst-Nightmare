import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";


const cityCoordinates = [
  { name: "Lahore", latitude: 31.560078, longitude: 74.33589 },
  { name: "Delhi", latitude: 28.635759353638, longitude: 77.224449157715 },
  { name: "Dhaka", latitude: 23.796373, longitude: 90.424614 },
  { name: "Kolkata", latitude: 22.562629699707, longitude: 88.363037109375 },
  { name: "Mumbai", latitude: 19.072830200195, longitude: 72.882606506348 },
  { name: "Baghdad", latitude: 33.3128, longitude: 44.3615 },
  { name: "Karachi", latitude: 24.8415, longitude: 67.0091 },
  { name: "Jakarta", latitude: -6.1603721, longitude: 106.8473377 },
  { name: "Kuwait City", latitude: 29.31773052, longitude: 47.93243708 },
];

const DataFetcher = () => {
  const [cityData, setCityData] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedCityData = [];

      for (const city of cityCoordinates) {
        try {
          const response = await axios.post(
            "https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyANZdRNWC8fTqkV80xgZb8K4L7VPFrDDuY",
            {
              universalAqi: true,
              location: {
                latitude: city.latitude,
                longitude: city.longitude,
              },
              extraComputations: [
                "DOMINANT_POLLUTANT_CONCENTRATION",
                "POLLUTANT_CONCENTRATION",
                "LOCAL_AQI",
              ],
              languageCode: "en",
            }
          );

          const airQualityData = response.data;

          // Extract the required information from the response
          const pollutants = airQualityData.pollutants.map((pollutant) => ({
            code: pollutant.code,
            value: pollutant.concentration.value,
          }));

          updatedCityData.push({
            name: city.name,
            indexCode: airQualityData.indexes[0].code,
            aqi: airQualityData.indexes[0].aqi,
            pollutants,
          });
        } catch (error) {
          console.error(`Error fetching data for ${city.name}: ${error}`);
        }
      }

      setCityData(updatedCityData);
      setFilteredCityData(updatedCityData); // Initialize the filtered data with all cities.
    };

    fetchData();
  }, []);

  const handleCitySearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredCityData(cityData); // Show all cities if the search term is empty.
    } else {
      // Filter the cities based on the search term.
      const filteredCities = cityData.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCityData(filteredCities);
    }
  };

  return (
    <div>
      <h2>City Air Quality Data</h2>
      <input
        type="text"
        placeholder="Search for a city..."
        onChange={(e) => handleCitySearch(e.target.value)}
      />
      <ul>
        {filteredCityData.map((cityInfo) => (
          <li key={cityInfo.name}>
            <strong>City Name:</strong> {cityInfo.name}
            <br />
            <strong>Index Code:</strong> {cityInfo.indexCode}
            <br />
            <strong>AQI:</strong> {cityInfo.aqi}
            <br />
            <strong>Pollutants:</strong>
            <ul>
              {cityInfo.pollutants.map((pollutant, index) => (
                <li key={index}>
                  <strong>Code:</strong> {pollutant.code}
                  <br />
                  <strong>Value:</strong> {pollutant.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
