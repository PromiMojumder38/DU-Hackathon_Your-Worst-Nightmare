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
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/top">Top 10 Polluted Cities</a>
            </li>
            <li>
              <a href="/low">Top 10 Cleanest Cities</a>
            </li>
            {/* <li>
              <a href="/home">Services</a>
            </li> */}
            <li>
              <a href="/ph">Search Cities</a>
            </li>
            {/* 
            <li>
              <Link to="/login" className={styles["a"]}>
                Login
              </Link>
            </li> */}

            <li>
              <Link to="/aqi">See List</Link>
            </li>
            <li>
              <Link to="/map">See Map</Link>
            </li>
          </ul>
        </div>

        <div className={styles["welcome-text"]}>
          <h1>
            <span>AtmosSense </span>
          </h1>
          <h2>
            Breathe <span>Informed</span> Live <span> Better</span>
          </h2>
        </div>
      </header>
    </div>
  );
}

export default Home;
