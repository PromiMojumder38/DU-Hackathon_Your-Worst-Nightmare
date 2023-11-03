const axios = require("axios");

// Define your API key and base URL
const apiKey = "";
const baseURL = "https://api.airvisual.com/v2";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAirQualityData(cityName, stateName, countryName) {
  const airQualityURL = `${baseURL}/city?city=${cityName}&state=${stateName}&country=${countryName}&key=${apiKey}`;
  try {
    const response = await axios.get(airQualityURL);
    if (response.data.status === "success") {
      const aqi = response.data.data.current.pollution.aqius;
      console.log(`AQI for ${cityName}, ${stateName}, ${countryName}: ${aqi}`);
    } else {
      console.log(`API call failed for ${cityName}, ${stateName}, ${countryName}`);
    }
  } catch (error) {
    console.error(`Error fetching air quality data for ${cityName}, ${stateName}, ${countryName}: ${error}`);
  }
}

async function getCitiesForStateAndCountry(stateName, countryName) {
  const cityListURL = `${baseURL}/cities?state=${stateName}&country=${countryName}&key=${apiKey}`;
  try {
    const response = await axios.get(cityListURL);
    const cities = response.data.data;
    console.log(`Cities for ${stateName}, ${countryName}:`, cities);
    for (const city of cities) {
      await getAirQualityData(city.city, stateName, countryName);
      await sleep(10000); // Sleep for 10 seconds between city API calls
    }
  } catch (error) {
    console.error(`Error fetching cities for ${stateName}, ${countryName}: ${error}`);
  }
}

async function getStatesForCountry(countryName) {
  const stateListURL = `${baseURL}/states?country=${countryName}&key=${apiKey}`;
  try {
    const response = await axios.get(stateListURL);
    const states = response.data.data;
    console.log(`States for ${countryName}:`, states);
    for (const state of states) {
      await getCitiesForStateAndCountry(state.state, countryName);
      await sleep(10000); // Sleep for 10 seconds between state API calls
    }
  } catch (error) {
    console.error(`Error fetching states for ${countryName}: ${error}`);
  }
}

async function getAllCountries() {
  const countryListURL = `${baseURL}/countries?key=${apiKey}`;
  try {
    const response = await axios.get(countryListURL);
    const countries = response.data.data;
    console.log("All countries:", countries);
    for (const country of countries) {
      await getStatesForCountry("country.country");
      await sleep(10000); // Sleep for 10 seconds between country API calls
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Call the function to start the process
getAllCountries();
