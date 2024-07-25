import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getClothingItems } from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: "", C: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleAddItemSubmit = () => {};

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
        // console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <ModalWithForm
          buttonText="Add garment"
          title="New garment"
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          handleClose={closeActiveModal}
          handleAddItemSubmit={handleAddItemSubmit}
        >
          <label htmlFor="modal__input-name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="modal__input-name"
              placeholder="Name"
              required
              minLength="1"
              maxLength="40"
            />
            <span
              className="modal__input-error modal__card-error"
              id="modal__input-name-error"
            ></span>
          </label>
          <label htmlFor="modal__input-url" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="modal__input-url"
              placeholder="Image URL"
              required
            />
            <span
              className="modal__input-error modal__card-error"
              id="modal__input-url-error"
            ></span>
          </label>
          <fieldset className="modal__radio-buttons" required>
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                name="weather-type"
                className="modal__radio-input"
                id="hot"
              />
              <span>Hot</span>
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                name="weather-type"
                className="modal__radio-input"
                id="warm"
              />
              <span>Warm</span>
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                name="weather-type"
                className="modal__radio-input"
                id="cold"
              />
              <span>Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleClose={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
