import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const noAvatar = Array.from(currentUser.name)[0];
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
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__text-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="header__avatar"
                  />
                ) : (
                  <p className="header__no-avatar">{noAvatar}</p>
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__text-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__text-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
