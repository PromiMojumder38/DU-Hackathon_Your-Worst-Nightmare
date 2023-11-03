const express = require("express");
const axios = require("axios");

const cors = require("cors");
const app = express();
app.use(cors());
const port = 3002;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/top-cities", async (req, res) => {
  const cities = [
    { name: "Lahore" },
    { name: "Delhi" },
    { name: "Kolkata" },
    { name: "Kuwait City" },
    { name: "Mumbai" },
    { name: "Dhaka" },
    { name: "Jakarta" },
    { name: "Baghdad" },
    { name: "Karachi" },
    { name: "New York" },
    { name: "London" },
    { name: "Paris" },
    { name: "Los Angeles" },
    { name: "Chicago" },
    { name: "San Francisco" },
    { name: "Miami" },
    { name: "Toronto" },
    { name: "Sydney" },
    { name: "Melbourne" },
    { name: "Tokyo" },
    { name: "Beijing" },
    { name: "Shanghai" },
    { name: "Seoul" },
    { name: "Hong Kong" },
    { name: "Bangkok" },
    { name: "Singapore" },
    { name: "Kuala Lumpur" },
    { name: "Dubai" },
    { name: "Istanbul" },
    { name: "Cairo" },
    { name: "Moscow" },
    { name: "Madrid" },
    { name: "Rome" },
    { name: "Berlin" },
    { name: "Amsterdam" },
    { name: "Vienna" },
    { name: "Prague" },
    { name: "Athens" },
    { name: "Budapest" },
    { name: "Warsaw" },
    { name: "Stockholm" },
    { name: "Oslo" },
    { name: "Copenhagen" },
    { name: "Helsinki" },
    { name: "Lisbon" },
    { name: "Dublin" },
    { name: "Zurich" },
    { name: "Geneva" },
    { name: "Brussels" },
    { name: "Luxembourg" },
    { name: "Vienna" },
    { name: "Prague" },
    { name: "Athens" },
    { name: "Budapest" },
    { name: "Warsaw" },
    { name: "Stockholm" },
    { name: "Oslo" },
    { name: "Copenhagen" },
    { name: "Helsinki" },
    { name: "Lisbon" },
    { name: "Dublin" },
    { name: "Zurich" },
    { name: "Geneva" },
    { name: "Brussels" },
    { name: "Luxembourg" },
    { name: "Vienna" },
    { name: "Prague" },
    { name: "Athens" },
    { name: "Budapest" },
    { name: "Warsaw" },
    { name: "Stockholm" },
    { name: "Oslo" },
    { name: "Copenhagen" },
    { name: "Helsinki" },
    { name: "Lisbon" },
    { name: "Dublin" },
    { name: "Zurich" },
    { name: "Geneva" },
    { name: "Brussels" },
    { name: "Luxembourg" },
    { name: "Vienna" },
    { name: "Prague" },
    { name: "Athens" },
    { name: "Budapest" },
    { name: "Warsaw" },
    { name: "Stockholm" },
    { name: "Oslo" },
    { name: "Copenhagen" },
    { name: "Helsinki" },
    { name: "Lisbon" },
    { name: "Dublin" },
    { name: "Zurich" },
    { name: "Geneva" },
    { name: "Brussels" },
    { name: "Luxembourg" }
    // Add more cities here
  ];

  // Fetch AQI data for all cities
  const cityDataPromises = cities.map(async (city) => {
    try {
      const response = await axios.get(
        `http://api.waqi.info/feed/${city.name}/?token=8f45e008c92e9c7ae7236be05cfd80103152b2e8`
      );
      const geo = response.data.data.city.geo;
      const aqi = response.data.data.aqi;

      console.log(aqi);

      return {
        city: city.name,
        geo,
        aqi,
      };
    } catch (error) {
      console.error(`Error fetching data for ${city.name}: ${error.message}`);
      return null;
    }
  });

  const cityData = await Promise.all(cityDataPromises);

  // Filter out any null results and sort by aqius in descending order
  const sortedCities = cityData
    .filter((data) => data !== null)
    .sort((a, b) => b.aqi - a.aqi);

  // Return the top 10 cities
  const top10Cities = sortedCities.slice(0, 20);

  res.json(top10Cities);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
