import { Table, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Owner() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [isFirstModalVisible, setIsFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://api.airvisual.com/v2/countries?key=73f73ad3-35b3-47c4-84a0-cf049ff62000")
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
      .get(`http://api.airvisual.com/v2/states?country=${country}&key=73f73ad3-35b3-47c4-84a0-cf049ff62000`)
      .then((response) => {
        setStates(response.data.data);
        setIsFirstModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching state data: ", error);
      });
  };

  const fetchCitiesForState = (state) => {
    console.log(state);
    console.log(selectedCountry);
    setSelectedState(state);
    axios
      .get(
        `http://api.airvisual.com/v2/cities?state=${state}&country=${selectedCountry}&key=73f73ad3-35b3-47c4-84a0-cf049ff62000`
      )
      .then((response) => {
        setCities(response.data.data);
        setIsSecondModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching city data: ", error);
      });
  };

  const columns = [
    {
      title: "Countries",
      dataIndex: "country",
      width: 50,
    },
    {
      title: "See More",
      render: (text, record) => (
        <div className="autorickshawButton">
          <Button type="primary" onClick={() => fetchStatesForCountry(record.country)}>
            See More
          </Button>
        </div>
      ),
      width: 50,
    },
  ];

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="PageContent">
          <h1 className="PageHeader">
            <UserOutlined className="icon" />
            List of Countries
          </h1>
          <Table
            className="TableOwner"
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
                <Button type="primary" onClick={() => fetchCitiesForState(state.state)}>
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
              </div>
            ))}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Owner;
