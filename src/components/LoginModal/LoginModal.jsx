import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal.jsx";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";
import * as auth from "../../utils/auth";
import { setToken } from "../../utils/token.js";
import { getUserInfo } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const LoginModal = ({
  handleSubmit,
  isOpen,
  handleClose,
  onRegisterClick,
  buttonText,
}) => {
  const navigate = useNavigate();
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const initialFormValues = {
    email: "",
    password: "",
  };

  const { formValues, handleFormChange, setFormValues } =
    useForm(initialFormValues);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      if (!formValues.email || !formValues.password) {
        return Promise.reject("Must provide email and password.");
      }
      return auth
        .authorize(formValues.email, formValues.password)
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
        });
    };
    handleSubmit(makeRequest);
    setFormValues(initialFormValues);
    navigate("/");
  };

  return (
    <Modal title="Log In" isOpen={isOpen} handleClose={handleClose}>
      <form
        className="modal__form"
        id="login-modal__form"
        name="modal-form"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="login-modal__input-email" className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            name="email"
            id="login-modal__input-email"
            placeholder="Email"
            required
            minLength="6"
            maxLength="50"
            value={formValues.email}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="login-modal__input-email-error"
          ></span>
        </label>
        <label htmlFor="login-modal__input-password" className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            name="password"
            id="login-modal__input-password"
            placeholder="Password"
            required
            minLength="8"
            maxLength="40"
            value={formValues.password}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="login-modal__input-password-error"
          ></span>
        </label>
        <div className="login-modal__submit-btn">
          <button type="submit" className="login-modal__submit">
            {buttonText}
          </button>
          or
          <button
            className="login-modal__register-toggle"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
