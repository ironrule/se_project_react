import React, { useEffect, useState, useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getClothingItems, deleteClothingItem } from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

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
  const [isLoading, setIsLoading] = useState(false);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleAddItemLocal = (newItem) => {
    setClothingItems((prevItems) => [newItem, ...prevItems]);
    closeActiveModal();
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const ref = useRef(null);
  const handleOutsideClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    },
    [closeActiveModal, ref]
  );

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = () => {
    setActiveModal("deleteConfirmation");
  };

  const handleDeleteConfirmed = (selectedCard) => {
    setIsLoading(true);
    deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
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
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleClose={closeActiveModal}
          handleAddItemLocal={handleAddItemLocal}
          handleOutsideClick={handleOutsideClick}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleClose={closeActiveModal}
          handleDeleteClick={handleDeleteClick}
          handleOutsideClick={handleOutsideClick}
        />
        <DeleteConfirmationModal
          card={selectedCard}
          handleClose={closeActiveModal}
          isOpen={activeModal === "deleteConfirmation"}
          handleSubmit={handleDeleteConfirmed}
          handleOutsideClick={handleOutsideClick}
          buttonText={isLoading ? "Saving..." : "Saved"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
