const axios = require("axios");

// Define your API key and base URL
const apiKey = "c6bea919-62f7-48ba-bf16-c8da52476c77";
const baseURL = "https://api.airvisual.com/v2";

// Function to fetch the top 10 polluted cities for all countries and states
async function getTopPollutedCitiesForAll() {
//   Step 1: Fetch the list of all countries
//   const countryListURL = `${baseURL}/countries?key=${apiKey}`;
//   const countryListResponse = await axios.get(countryListURL);
//   const countries = countryListResponse.data.data;

//   console.log(countries);



//   let topCities = [];

//  for (const country of countries) {
    const countryName = "Bangladesh";

    // Fetch the list of states for the current country
    const stateListURL = `${baseURL}/states?country=${countryName}&key=${apiKey}`;
    const stateListResponse = await axios.get(stateListURL);
    const states = stateListResponse.data.data;
    
    console.log(states);
  
}

getTopPollutedCitiesForAll();
