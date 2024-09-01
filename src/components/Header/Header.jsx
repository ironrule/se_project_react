import logo from "../../images/logo.svg";
// import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR Logo Image" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__right">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <Link to="/profile">
          <div className="header__user-container">
            <p className="header__username"></p>
            <img src="" alt="" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
