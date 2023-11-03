import React from "react";
import {useNavigate } from "react-router-dom";
import { HomeOutlined} from "@ant-design/icons";
import { Image } from "antd";
import "./index.css";

function AppHeader() {
  const navigate = useNavigate();
  return (
    <div className="AppHeader">
      <div className="AppHeaderTitle">
        <Image width={35} className="AppHeaderImg" src="./logo.png"></Image>
        <div className="AppHeaderTitle2">
          <span> স্বাগতম ,</span> শাবিপ্রবি অটোরিকশা ম্যানেজমেন্ট সিস্টেম
          <HomeOutlined
            className="icon"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
}
export default AppHeader;
