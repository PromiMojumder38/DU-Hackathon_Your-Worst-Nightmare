import React from "react";
import styles from "./Home.module.css"; // Import your CSS module here
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.home}>
      <header>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src={require("./Images/logo.png")} alt="Home" />
          </div>
          <ul className={styles["nav-area"]}>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/home">About</a>
            </li>
            {/* <li>
              <a href="/home">Services</a>
            </li> */}
            <li>
              <a href="/home">Contact</a>
            </li>
{/* 
            <li>
              <Link to="/login" className={styles["a"]}>
                Login
              </Link>
            </li> */}

            <li>
              <Link to="/aqi" className={styles["ap"]}>
                See List 
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles["welcome-text"]}>
          <h1>
            <span></span>
          </h1>
          <h2>
            <span></span>  <span></span>
          </h2>

          
        </div>
      </header>
    </div>
  );
}

export default Home;
