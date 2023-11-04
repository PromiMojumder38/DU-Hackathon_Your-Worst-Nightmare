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

  return (
    <div style={{ padding : 90 }}>
      <button onClick={handleFetchData}>Fetch Data</button>
      {data[0].length > 0 ? (
        <div>
          {tableUrls.map((url, index) => (
            <div key={index}>
              <h2>Data Table {index + 1}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Indicator</th>
                    <th>Date</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data[index].map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{item.indicator.value}</td>
                      <td>{item.date}</td>
                      <td>{item.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2>Bar Chart {index + 1}</h2>
              <ResponsiveContainer width="80%" height={300} >
                <BarChart data={data[index]} >
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="value" tickFormatter={(value) => parseInt(value, 10).toString().slice(0, 3)} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Value"/>
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
