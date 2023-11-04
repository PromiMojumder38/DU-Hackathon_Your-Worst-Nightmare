import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Map from "../map/Map.jsx";

const cityCoordinates = [
  { name: "Lahore", latitude: 31.560078, longitude: 74.33589 },
  { name: "Delhi", latitude: 28.635759353638, longitude: 77.224449157715 },
  { name: "Dhaka", latitude: 23.796373, longitude: 90.424614 },
  { name: "Kolkata", latitude: 22.562629699707, longitude: 88.363037109375 },
  { name: "Mumbai", latitude: 19.072830200195, longitude: 72.882606506348 },
  { name: "Baghdad", latitude: 33.3128, longitude: 44.3615 },
  { name: "Karachi", latitude: 24.8415, longitude: 67.0091 },
  { name: "Jakarta", latitude: 6.1603721, longitude: 106.8473377 },
  { name: "Kuwait City", latitude: 29.31773052, longitude: 47.93243708 },
  { name: "New York", latitude: 40.7128, longitude: -74.0060 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
  { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
  { name: "Miami", latitude: 25.7617, longitude: -80.1918 },
  { name: "Toronto", latitude: 43.651070, longitude: -79.347015 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Melbourne", latitude: -37.8136, longitude: 144.9631 },
  { name: "Tokyo", latitude: 35.682839, longitude: 139.759455 },
  { name: "Beijing", latitude: 39.9042, longitude: 116.4074 },
  { name: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
  { name: "Seoul", latitude: 37.5665, longitude: 126.9780 },
  { name: "Hong Kong", latitude: 22.3193, longitude: 114.1694 },
  { name: "Bangkok", latitude: 13.7563, longitude: 100.5018 },
  { name: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { name: "Kuala Lumpur", latitude: 3.1390, longitude: 101.6869 },
  { name: "Dubai", latitude: 25.276987, longitude: 55.296249 },
  { name: "Istanbul", latitude: 41.0082, longitude: 28.9784 },
  { name: "Cairo", latitude: 30.0444, longitude: 31.2357 },
  { name: "Moscow", latitude: 55.7558, longitude: 37.6176 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
  { name: "Berlin", latitude: 52.5200, longitude: 13.4050 },
  { name: "Amsterdam", latitude: 52.3676, longitude: 4.9041 },
  { name: "Vienna", latitude: 48.2082, longitude: 16.3738 },
  { name: "Prague", latitude: 50.0755, longitude: 14.4378 },
  { name: "Athens", latitude: 37.9838, longitude: 23.7275 },
  { name: "Budapest", latitude: 47.4979, longitude: 19.0402 },
  { name: "Warsaw", latitude: 52.2297, longitude: 21.0122 },
  { name: "Stockholm", latitude: 59.3293, longitude: 18.0686 },
  { name: "Oslo", latitude: 59.9139, longitude: 10.7522 },
  { name: "Copenhagen", latitude: 55.6761, longitude: 12.5683 },
  { name: "Helsinki", latitude: 60.1699, longitude: 24.9384 },
  { name: "Lisbon", latitude: 38.7223, longitude: -9.1393 },
  { name: "Dublin", latitude: 53.3498, longitude: -6.2603 },
  { name: "Zurich", latitude: 47.3769, longitude: 8.5417 },
  { name: "Geneva", latitude: 46.2044, longitude: 6.1432 },
  { name: "Brussels", latitude: 50.8503, longitude: 4.3517 },
  { name: "Luxembourg", latitude: 49.6116, longitude: 6.1319 },
  // Add more cities as needed
];


const DataFetcher = () => {
  const [cityData, setCityData] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const updatedCityData = [];

      for (const city of cityCoordinates) {
        try {
          const response = await axios.post(
            "https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyANZdRNWC8fTqkV80xgZb8K4L7VPFrDDuY", // Replace with your API key
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
      setFilteredCityData(updatedCityData);
    };

    fetchData();
  }, []);

  // Define a function to map AQI ranges to comments
  const getAqiComment = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return "Good";
    else if (aqi >= 51 && aqi <= 100) return "Moderate";
    else if (aqi >= 101 && aqi <= 150) return "Unhealthy for Sensitive Groups";
    else if (aqi >= 151 && aqi <= 200) return "Unhealthy";
    else if (aqi >= 201 && aqi <= 300) return "Very Unhealthy";
    else return "Hazardous";
  };

  const handleCityClick = (cityInfo) => {
    const selectedCity = cityCoordinates.find((city) => city.name === cityInfo.name);

    if (selectedCity) {
      setSelectedCity({
        ...cityInfo,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        aqiComment: getAqiComment(cityInfo.aqi),
      });
    } else {
      console.error(`City "${cityInfo.name}" not found in the initial array`);
    }
  };

  const handleCitySearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredCityData(cityData);
    } else {
      const filteredCities = cityData.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCityData(filteredCities);
    }
  };

  const closeCityDetails = () => {
    setSelectedCity(null);
  };

  return (
    <div>
      <h2>City Air Quality Data</h2>
      <input
        type="text"
        placeholder="Search for a city..."
        onChange={(e) => handleCitySearch(e.target.value)}
      />
      <ul className="PHul">
        {filteredCityData.map((cityInfo) => (
          <li
            className="PHli"
            key={cityInfo.name}
            onClick={() => handleCityClick(cityInfo)}
            style={{ cursor: "pointer" }}
          >
            <strong>City Name:</strong> {cityInfo.name}
          </li>
        ))}
      </ul>
      {selectedCity && (
        <div className="popup">
          <button className="close-button" onClick={closeCityDetails}>
            X
          </button>
          <strong>City Name:</strong> {selectedCity.name}
          <br />
          <strong>Longitude:</strong> {selectedCity.longitude}
          <br />
          <strong>Index Code:</strong> {selectedCity.indexCode}
          <br />
          <strong>Pollutants:</strong>
          <ul className="PHul">
            {selectedCity.pollutants.map((pollutant, index) => (
              <li className="PHli" key={index}>
                <strong>Code:</strong> {pollutant.code}
                <br />
                <strong>Value:</strong> {pollutant.value}
              </li>
            ))}
          </ul>
          <Map lat={selectedCity.latitude} lng={selectedCity.longitude} />
        </div>
      )}
    </div>
  );
};

export default DataFetcher;