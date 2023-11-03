import { Table, Button, Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);

  const [driver, setDataSource23] = useState([]);
  const [autorickshaw, setDataSource3] = useState([]);

  function driverData() {
    fetch("http://localhost:3001/api/totalPayment")
      .then((response) => response.json())
      .then((data) => {
        // Check if the total payment is 0 and replace it with "0"
        const totalPayment = data.totalPayment === null ? "0" : data.totalPayment;
        setDataSource23(totalPayment);
        console.log("Success fetching total payment data: ");
      })
      .catch((error) => {
        console.error("Error fetching total payment data: ", error);
      });
  }  
  

  function autorickshawData() {
    fetch("http://localhost:3001/api/totalautorickshaws")
      .then((response) => response.json())
      .then((data) => {
        setDataSource3(data.totalautorickshaws);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
      });
  }

  useEffect(() => {
    driverData();
    autorickshawData();
  });

  function ScheduleData() {
    setLoading(true);
    fetch("http://localhost:3001/api/payment")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment data: ", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    ScheduleData();
  }, []);

  // Fetch and process the data on the client side
useEffect(() => {
  setLoading2(true);
  fetch("http://localhost:3001/api/paymentdue")
    .then((response) => response.json())
    .then((data) => {
      const summaryData = createSummaryData(data.payments);
      setDataSource2(summaryData);
      console.log(summaryData);
      setLoading2(false);
    })
    .catch((error) => {
      console.error("Error fetching payment due data: ", error);
      setLoading2(false);
    });
}, []);

// Assuming "permission_start_date" is a valid date string in the format "YYYY-MM-DD"
const formatDate = (dateString) => {
  if (!dateString) {
    return ''; // Handle cases where the date is missing
  }

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate;
};

const createSummaryData = (payments) => {
  const summaryData = [];
  const uniqueAutorickshawNumbers = new Set();

  payments.forEach((payment) => {
    if (!uniqueAutorickshawNumbers.has(payment.autorickshaw_number)) {
      uniqueAutorickshawNumbers.add(payment.autorickshaw_number);

      // Calculate the difference between "permission_start_date" and today
      const permissionStartDate = new Date(payment.permission_start_date);
      const today = new Date();
      const dateDifferenceInDays = permissionStartDate ? Math.floor((today - permissionStartDate) / (1000 * 60 * 60 * 24)) : 0;

      // Calculate the due amount based on the date difference
      const dueAmount = (dateDifferenceInDays+1) * 25;

      // Calculate total payment minus due amount
      const totalPayment = parseInt(payment.total_payment, 10);
      const totalPaymentMinusDue =  dueAmount-totalPayment;

      // Format the last payment date, or display "Not paid yet" if it's missing
      const lastPaymentDate = (payment.last_payment_date !== null) ? new Date(payment.last_payment_date) : 'Not paid yet';

      summaryData.push({
        autorickshaw_number: payment.autorickshaw_number,
        total_payment: totalPayment,
        driver_payment_due: dueAmount,
        payment_date: (lastPaymentDate instanceof Date) ? formatDate(lastPaymentDate) : lastPaymentDate,
        total_payment_minus_due: totalPaymentMinusDue, // Add the calculated total payment minus due
      });
    }
  });
  return summaryData;
};



  const columns = [
    {
      title: "তারিখ",
      dataIndex: "payment_date",
    },
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "টাকার পরিমাণ",
      dataIndex: "payment_amount",
    },
    
  ];

  const columns2 = [
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "প্রদত্ত টাকার পরিমাণ",
      dataIndex: "total_payment",
    },
    {
      title: "বাকি টাকার পরিমাণ",
      dataIndex: "total_payment_minus_due",
    },
    {
      title: "সর্বশেষ পরিশোধের তারিখ",
      dataIndex: "payment_date", // Use "permission_start_date" here
    },
  ];
  
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="SetPageContent">
          <div className="PageContents">
            <h1 className="PageHeader">
              <EditOutlined className="icon" />
              ড্রাইভারের পেমেন্ট বিবরণ এন্ট্রি ফর্ম
            </h1>
            <div className="PageContentDash">
              <div className="dashboard-home">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={driver}
                    text={`${driver}`}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(86, 244, 138, 0.8)`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: "#d6d6d6",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "rgba(0, 0, 0, 0.758)",
                        // Text size
                        fontSize: "36px",
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: "#8a9a6",
                      },
                    }}
                  />
                </div>
                <h1 className="circularHeader">মোট পরিশোধিত টাকা</h1>
              </div>

              <div className="dashboard-home">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={autorickshaw}
                    text={`${autorickshaw}`}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(232, 244, 86, 0.8)`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: "#d6d6d6",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "rgba(0, 0, 0, 0.758)",
                        // Text size
                        fontSize: "36px",
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: "rgba(0, 0, 0, 0.758)",
                      },
                    }}
                  />
                </div>
                <h1 className="circularHeader">অটোরিকশা সংখ্যা</h1>
              </div>
            </div>
          </div>
          <div className="PageContentQM">
            <div className="PagecenterM">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                পরিশোধিত অর্থের হিসাব 
              </h1>

              <Table
                className="TableSchedule"
                loading={loading}
                columns={columns} // Use the modified columns configuration
                dataSource={dataSource}
                pagination={{
                  pageSize: 7,
                }}
              ></Table>
            </div>

            <div className="PageFooterM">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                বকেয়া পেমেন্ট
              </h1>

              <Table
                className="TableSchedule"
                loading={loading2}
                columns={columns2} // Use the modified columns configuration
                dataSource={dataSource2}
                pagination={{
                  pageSize: 7,
                }}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
