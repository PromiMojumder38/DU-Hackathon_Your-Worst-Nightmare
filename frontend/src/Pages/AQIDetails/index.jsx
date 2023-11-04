import { Table, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AQI() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isFirstModalVisible, setIsFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [cityData, setCityData] = useState(null);
  const keyy = "d63e1a5b-d327-4aa6-bfff-2062f4c097f9";

  useEffect(() => {
    axios
      .get(`https://api.airvisual.com/v2/countries?key=${keyy}`)
      .then((response) => {
        setCountries(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country data: ", error);
        setLoading(false);
      });
  }, []);

  const fetchStatesForCountry = (country) => {
    setSelectedCountry(country);
    axios
      .get(`http://api.airvisual.com/v2/states?country=${country}&key=${keyy}`)
      .then((response) => {
        setStates(response.data.data);
        setIsFirstModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching state data: ", error);
      });
  };

  const fetchCitiesForState = (state) => {
    setSelectedState(state);
    axios
      .get(
        `http://api.airvisual.com/v2/cities?state=${state}&country=${selectedCountry}&key=${keyy}`
      )
      .then((response) => {
        setCities(response.data.data);
        setIsSecondModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching city data: ", error);
      });
  };

  const handleSeeMoreClick = (countryName) => {
    // Redirect to the App component with the countryName parameter

    // Redirect to the App component with the countryName parameter
    navigate(`/app/${countryName}`);
  };

  const fetchCityData = (city) => {
    setSelectedCity(city);
    axios
      .get(
        `http://api.airvisual.com/v2/city?city=${city}&state=${selectedState}&country=${selectedCountry}&key=${keyy}`
      )
      .then((response) => {
        setCityData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching city data: ", error);
      });
  };

  const columns = [
    {
      title: "Countries",
      dataIndex: "country",
      width: 300,
    },
    {
      title: "States",
      render: (text, record) => (
        <div className="autorickshawButton">
          <Button
            type="primary"
            onClick={() => fetchStatesForCountry(record.country)}
          >
            See More
          </Button>
        </div>
      ),
      width: 50,
    },
    {
      title: "Social Economic Factors",
      render: (text, record) => (
        <div className="autorickshawButton">
          <Button
            type="primary"
            onClick={() => handleSeeMoreClick(record.country)}
          >
            Check Here
          </Button>
        </div>
      ),
      width: 50,
    },
  ];

  function getBackgroundColorClass(aqius) {
    if (aqius >= 0 && aqius <= 50) {
      return "green-background";
    } else if (aqius >= 51 && aqius <= 100) {
      return "orange-background";
    } else if (aqius >= 101 && aqius <= 150) {
      return "red-background";
    } else if (aqius >= 151 && aqius <= 200) {
      return "violet-background";
    } else {
      return "brown-background";
    }
  }

  return (
    <div className="App">
      <div className="SideMenuAndPageContent">
        <div className="PageContent">
          <h1 className="PageHeader">
            <UserOutlined className="icon" />
            List of Countries
          </h1>
          <Table
            className="TableAQI"
            loading={loading}
            columns={columns}
            dataSource={countries}
            pagination={{
              pageSize: 20,
            }}
          ></Table>
          <Modal
            title={`States in ${selectedCountry}`}
            visible={isFirstModalVisible}
            onOk={() => setIsFirstModalVisible(false)}
            onCancel={() => setIsFirstModalVisible(false)}
          >
            {states.map((state) => (
              <div key={state.state}>
                {state.state}
                <Button
                  type="primary"
                  onClick={() => fetchCitiesForState(state.state)}
                >
                  See Cities
                </Button>
              </div>
            ))}
          </Modal>
          <Modal
            title={`Cities in ${selectedState}, ${selectedCountry}`}
            visible={isSecondModalVisible}
            onOk={() => setIsSecondModalVisible(false)}
            onCancel={() => setIsSecondModalVisible(false)}
          >
            {cities.map((city) => (
              <div key={city.city}>
                {city.city}
                <Button type="primary" onClick={() => fetchCityData(city.city)}>
                  See More
                </Button>
              </div>
            ))}
          </Modal>

          <Modal
            title={`City: ${selectedCity}, ${selectedState}, ${selectedCountry}`}
            visible={cityData !== null}
            onOk={() => setIsSecondModalVisible(false)}
            onCancel={() => setIsSecondModalVisible(false)}
          >
            {cityData && (
              <div
                className={`dataContainer ${getBackgroundColorClass(
                  cityData.current.pollution.aqius
                )}`}
              >
                <div className="dataColumn">
                  <p>Pollution Data:</p>
                  <p>Timestamp: {cityData.current.pollution.ts}</p>
                  <p>AQI US: {cityData.current.pollution.aqius}</p>
                  <p>Main US: {cityData.current.pollution.mainus}</p>
                  <p>AQI CN: {cityData.current.pollution.aqicn}</p>
                  <p>Main CN: {cityData.current.pollution.maincn}</p>
                </div>
                <div className="dataColumn">
                  <p>Weather Data:</p>
                  <p>Timestamp: {cityData.current.weather.ts}</p>
                  <p>Temperature (°C): {cityData.current.weather.tp}</p>
                  <p>Pressure (hPa): {cityData.current.weather.pr}</p>
                  <p>Humidity : {cityData.current.weather.hu} %</p>
                  <p>Wind Speed : {cityData.current.weather.ws} m/s</p>
                  <p>Wind Direction (°): {cityData.current.weather.wd}</p>
                  <p>Icon: {cityData.current.weather.ic}</p>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AQI;
