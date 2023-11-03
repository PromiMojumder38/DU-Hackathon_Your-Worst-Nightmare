import { Table, Button, Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import scheduleRegistrationValidation from "./scheduleValidation";
import styles from "./schedule.module.css"; //

import {
  EditOutlined,
  CalendarOutlined,
  CarOutlined,
  EyeOutlined,
  HourglassOutlined,
  FieldTimeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [autorickshaws, setAutorickshaws] = useState([]);
  // const [selectedSchedule, setSelectedSchedule] = useState(null);

  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schedule_date: "",
    schedule_round: "",
    schedule_place: "",
    schedule_time: "",
    autorickshaw_number: "",
  });

  const [errors, setErrors] = useState({
    schedule_date: "",
    schedule_round: "",
    schedule_place: "",
    schedule_time: "",
    autorickshaw_number: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  function ScheduleData() {
    setLoading(true);
    fetch("http://localhost:3001/api/autorickshawSchedule")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.users.sort((a, b) => {
          const dateA = new Date(a.schedule_date);
          const dateB = new Date(b.schedule_date);
          return dateB - dateA; 
        });        
        setDataSource(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
        setLoading(false);
      });
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log(formData);
  
    // Wait until the errors are set
    const validationErrors = scheduleRegistrationValidation(formData);
    setErrors(validationErrors);
  
    console.log(validationErrors);
  
    // Use async/await to ensure state is updated
  
    // Check for specific error conditions
    if (
      validationErrors.schedule_date === "" &&
      validationErrors.schedule_round === "" &&
      validationErrors.schedule_place === "" &&
      validationErrors.schedule_time === "" &&
      validationErrors.autorickshaw_number === ""
    ) {
      try {
        console.log("here");
        const response = await axios.post(`http://localhost:3001/updateschedule`, formData);
  
        if (response.status === 200) { // Check if the response status is in the 200 range
          // Check the response data or message in a flexible way
          if (response.data === "success") {
            Modal.success({
              title: "Successful !",
              content: "আপনি সফলভাবে একটি শিডিউল তৈরি করেছেন",
              onOk: () => {
                ScheduleData();
              },
            });
          } else {
            alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
          }
        } else {
          alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
        }
      } catch (error) {
        alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message based on the first encountered error
      const errorMessages = Object.values(validationErrors).filter(
        (error) => error !== ""
      );
      if (errorMessages.length > 0) {
        alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      } else {
        alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    }
  };
  

  useEffect(() => {
    ScheduleData();
  }, []);

  useEffect(() => {
    setLoading2(true);
    fetch("http://localhost:3001/api/permittedAutorickshaws")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataSource2(data.autorickshaws);
        setAutorickshaws(data.autorickshaws);
        console.log(data.autorickshaws);
        setLoading2(false);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
        setLoading2(false);
      });
  }, []);
  
  

  const handleDelete = (record) => {
    // Display a confirmation modal before deleting
    Modal.confirm({
      title: "Confirm Deletion",
      content: "আপনি কি নিশ্চিত যে আপনি এই সময়সূচি মুছতে চান?",
      onOk: () => {
        console.log(record);
        axios
          .delete(`http://localhost:3001/deleteschedule/${record.id}`)
          .then((res) => {
            if (res.data === "success") {
              Modal.success({
                title: "Successful !",
                content: "আপনি সফলভাবে একটি সময়সূচি মুছে ফেলেছেন",
                onOk: () => {
                  ScheduleData();
                },
              }); // Refresh the schedule data after deletion
            } else {
              alert("Failed to delete the schedule. Please try again.");
            }
          })
          .catch((err) => {
            alert(
              "An error occurred while deleting the schedule. Please try again."
            );
          });
      },
    });
  };

  const columns = [
    {
      title: "তারিখ",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_date}</span>
        ) : null,
    },
    {
      title: "গন্তব্য",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_place}</span>
        ) : null,
    },
    {
      title: "রাউন্ড",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_round}</span>
        ) : null,
    },
    {
      title: "সময়",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_time}</span>
        ) : null,
    },
    {
      title: "কার্যক্রম",
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <Button type="primary" onClick={() => handleViewAutorickshaws(record)}>
              দেখুন অটোরিক্শা
            </Button>
          );
        }
        return null;
      },
    },
    {
      title: "কার্যক্রম",
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              মুছুন
            </Button>
          );
        }
        return null;
      },
    },
  ];
  
  
  
  // Define a state variable to track the currently open schedule ID
const [openScheduleID, setOpenScheduleID] = useState(null);

const handleViewAutorickshaws = (schedule) => {
    // Fetch autorickshaw numbers from the API using the schedule ID
    fetch(`http://localhost:3001/api/autorickshawSchedule/${schedule.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data) && data.data.length > 0) {
          const autorickshawNumbers = data.data.map((item) => item.autorickshaw_number); // Extract all autorickshaw numbers
          console.log(autorickshawNumbers);
  
          // Display the autorickshaw numbers in a list
          Modal.info({
            title: `${schedule.schedule_date} - ${schedule.schedule_place} - ${schedule.schedule_round}`,
            content: (
              <div>
                <p>অটোরিক্শা নাম্বারঃ</p>
                <ul>
                  {autorickshawNumbers.map((number, index) => (
                    <li key={index}>{number}</li> 
                  ))}
                </ul>
              </div>
            ),
            width: "60%",
          });
        } else {
          // Handle the case when data is not in the expected format or is empty
          console.error("No autorickshaw data found or it's not in the expected format.");
          // You can display an error message or take appropriate action here
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during fetching autorickshaw data
        console.error("Error fetching autorickshaw data: ", error);
        // You can display an error message or take appropriate action here
      });
  };
  
  
  
  
  
  


  const AutorickshawsTable = ({ autorickshaws, scheduleId }) => {
    const autorickshawColumns = [
      {
        title: "অটোরিক্শা নাম্বার",
        dataIndex: "autorickshaw_number",
      },
      {
        title: "কার্যক্রম",
        render: (text, record) => (
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            মুছুন
          </Button>
        ),
      },
    ];

    return (
      <Table
        columns={autorickshawColumns}
        dataSource={autorickshaws}
        pagination={false}
      />
    );
  };
  
  const columns2 = [
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="ScheduleButton">
         
          <Button type="primary" danger>
            <span>অনুপস্থিত</span>
          </Button>
        </div>
      ),
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
              শিডিউল তৈরি করুন
            </h1>
            <form className={styles.scheduleForm} onSubmit={handleSubmit}>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <CalendarOutlined className={styles.iconShow} />
                  তারিখ
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_date"
                  name="schedule_date"
                  placeholder="তারিখ প্রদান করুন"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={formData.schedule_date}
                  onChange={handleInputChange}
                />
                {errors.schedule_date && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_date}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <NotificationOutlined className={styles.iconShow} />
                  রাউন্ড
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_round"
                  name="schedule_round"
                  placeholder="রাউন্ড নম্বর নির্বাচন করুন"
                  value={formData.schedule_round}
                  onChange={handleInputChange}
                />
                {errors.schedule_round && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_round}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
  <p className={styles.scheduleParagraph}>
    <HourglassOutlined className={styles.iconShow} />
    গন্তব্য{" "}
  </p>
  <select
    className={styles.scheduleSelect}
    id="schedule_place"
    name="schedule_place"
    value={formData.schedule_place}
    onChange={handleInputChange}
  >
    <option key="default" value="">গন্তব্য নির্বাচন করুন</option>
    <option value="E Building">E Building</option>
    <option value="Boys Hall">Boys Hall</option>
    <option value="Ladies Hall">Ladies Hall</option>
  </select>
  {errors.schedule_place && (
    <span className={styles.scheduleError}>
      {errors.schedule_place}
    </span>
  )}
</div>

              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <FieldTimeOutlined className={styles.iconShow} />
                  সময়
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_time"
                  name="schedule_time"
                  placeholder="প্রস্থান সময় নির্বাচন করুন"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={formData.schedule_time}
                  onChange={handleInputChange}
                />
                {errors.schedule_time && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_time}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
  <p className={styles.scheduleParagraph}>
    <CarOutlined className={styles.iconShow} />
    অটোরিক্শা নাম্বার
  </p>
  <select
  className={styles.scheduleSelect}
  id="autorickshaw_number"
  name="autorickshaw_number"
  placeholder="অটোরিক্শা নাম্বার নির্বাচন করুন"
  value={formData.autorickshaw_number}
  onChange={handleInputChange}
>
  <option key="default" value="">
    অটোরিক্শা নির্বাচন করুন
  </option>
  {autorickshaws &&
    autorickshaws.map((autorickshaw, index) => (
      <option key={index} value={autorickshaw.autorickshaw_number}>
        {autorickshaw.autorickshaw_number}
      </option>
    ))}
</select>


  {errors.autorickshaw_number && ( // Corrected the error check here
    <span className={styles.scheduleError}>
      {errors.autorickshaw_number} 
    </span>
  )}
</div>

              <button type="submit" className={styles.scheduleButton}>
                ADD
              </button>
            </form>
          </div>
          <div className="PageContentQ">
            <div className="Pagecenter">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                শিডিউল দেখুন
              </h1>
            
              <Table
                className="TableSchedule"
                loading={loading}
                columns={columns} // Use the modified columns configuration
                dataSource={dataSource}
                pagination={{
                  pageSize: 4,
                }}
              ></Table>
            </div>

            <div className="PageFooter">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                অটোরিকশার তালিকা
              </h1>

              <Table
                className="TableSchedule"
                loading={loading2}
                columns={columns2} // Use the modified columns configuration
                dataSource={dataSource2}
                pagination={{
                  pageSize: 4,
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