
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchCountryData = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.worldbank.org/v2/countries?format=json');
      const data = response.data;

      const countries = data.map((country) => {
        return {
          id: country.id,
          name: country.name,
          key: country.id
        };
      });

      setCountries(countries);
    };

    fetchData();
  }, []);

  return countries;
};

export default useFetchCountryData;