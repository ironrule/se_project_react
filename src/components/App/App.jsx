import React, { useEffect, useState, useCallback, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { coordinates, apiKey } from "../../utils/constants.js";
import {
  getClothingItems,
  getUserInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { ClothingItemContext } from "../../contexts/ClothingItemContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { getToken, removeToken } from "../../utils/token.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: "", C: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardLike = (id, isLiked) => {
    const token = getToken();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login-modal");
  };

  const handleRegisterClick = () => {
    setActiveModal("register-modal");
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openProfileEditModal = () => {
    setActiveModal("edit-profile-modal");
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

  /**============================================
   *          Universal Submit Handler
   *=============================================**/
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  /*==================== End ====================*/

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser }}
    >
      <ClothingItemContext.Provider
        value={{ handleCardLike, clothingItems, setClothingItems }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                handleRegisterClick={handleRegisterClick}
                handleLoginClick={handleLoginClick}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        handleAddClick={handleAddClick}
                        handleCardClick={handleCardClick}
                        handleLogout={handleLogout}
                        openProfileEditModal={openProfileEditModal}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              handleClose={closeActiveModal}
              handleOutsideClick={handleOutsideClick}
              buttonText={isLoading ? "Adding garment..." : "Add garment"}
              handleSubmit={handleSubmit}
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
              buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
              handleSubmit={handleSubmit}
              handleOutsideClick={handleOutsideClick}
            />
            <LoginModal
              isOpen={activeModal === "login-modal"}
              handleClose={closeActiveModal}
              handleOutsideClick={handleOutsideClick}
              onRegisterClick={handleRegisterClick}
              buttonText={isLoading ? "Logging In..." : "Log In"}
              handleSubmit={handleSubmit}
            />
            <RegisterModal
              isOpen={activeModal === "register-modal"}
              handleClose={closeActiveModal}
              handleOutsideClick={handleOutsideClick}
              onLoginClick={handleLoginClick}
              buttonText={isLoading ? "Wait..." : "Next"}
              handleSubmit={handleSubmit}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile-modal"}
              handleClose={closeActiveModal}
              handleOutsideClick={handleOutsideClick}
              buttonText={isLoading ? "Wait..." : "Save changes"}
              handleSubmit={handleSubmit}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
