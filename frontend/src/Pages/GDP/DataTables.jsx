import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DataTables({ countryCode }) {
  const tableUrls = [
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.GROW?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json`,
  ];

  const [data, setData] = useState(new Array(tableUrls.length).fill([]));

  const handleFetchData = () => {
    Promise.all(
      tableUrls.map((url) => fetch(url).then((response) => response.json()))
    )
      .then((responses) => {
        const newData = responses.map((data) => data[1]);
        setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const tableContainerStyle = {
    padding: "20px", // Add your desired padding
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px", // Add margin to create space
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px", // Add margin to create space
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    textAlign: "center",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
  };

  const chartContainerStyle = {
    marginBottom: "20px", // Add margin to create space
  };

  const chartTitleStyle = {
    margin: "10px 0",
  };

  return (
    <div style={tableContainerStyle}>
      <button onClick={handleFetchData} style={buttonStyle}>
        Fetch Data
      </button>
      {data[0].length > 0 ? (
        <div>
          {tableUrls.map((url, index) => (
            <div key={index} style={chartContainerStyle}>
              <h2 style={chartTitleStyle}>Data Table {index + 1}</h2>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Indicator</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data[index].map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      <td style={tdStyle}>{item.indicator.value}</td>
                      <td style={tdStyle}>{item.date}</td>
                      <td style={tdStyle}>{item.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 style={chartTitleStyle}>Bar Chart {index + 1}</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data[index]}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="date" />
                  <YAxis
                    dataKey="value"
                    tickFormatter={(value) =>
                      parseInt(value, 10).toString().slice(0, 3)
                    }
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default DataTables;