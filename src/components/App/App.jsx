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
  addClothingItem,
  deleteClothingItem,
  getUserInfo,
  editUserInfo,
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
import * as auth from "../../utils/auth.js";
import { setToken, getToken, removeToken } from "../../utils/token.js";
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

  const handleLogin = ({ email, password }, resetForm) => {
    if (!email || !password) {
      return Promise.reject("Must provide email and password.");
    }
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return getUserInfo(data.token);
        } else {
          return Promise.reject("Invalid email or password.");
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        resetForm();
        navigate("/");
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleRegistration = (registrationData, resetForm) => {
    auth
      .register(registrationData)
      .then(() => {
        return auth.authorize(
          registrationData.email,
          registrationData.password
        );
      })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return getUserInfo(data.token);
        } else {
          return Promise.reject("Registration failed.");
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        resetForm();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleAddItem = (newItem, resetForm) => {
    const token = getToken();
    addClothingItem(newItem, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openProfileEditModal = () => {
    setActiveModal("edit-profile-modal");
  };

  const handleEditProfileSubmit = ({ name, avatar }, resetForm) => {
    const token = getToken();
    editUserInfo(name, avatar, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
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
    const token = getToken();
    deleteClothingItem(selectedCard._id, token)
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
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <ClothingItemContext.Provider value={{ handleCardLike }}>
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
                      clothingItems={clothingItems}
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
                        clothingItems={clothingItems}
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
              handleAddItem={handleAddItem}
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
            <LoginModal
              isOpen={activeModal === "login-modal"}
              handleClose={closeActiveModal}
              handleLogin={handleLogin}
              handleOutsideClick={handleOutsideClick}
            />
            <RegisterModal
              isOpen={activeModal === "register-modal"}
              handleClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleOutsideClick={handleOutsideClick}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile-modal"}
              handleClose={closeActiveModal}
              handleEditProfileSubmit={handleEditProfileSubmit}
              handleOutsideClick={handleOutsideClick}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
