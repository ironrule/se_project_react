import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

const LoginModal = ({
  handleLogin,
  isOpen,
  handleClose,
  handleOutsideClick,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formValues, resetForm);
  };

  const initialFormValues = {
    email: "",
    password: "",
  };

  const { formValues, handleFormChange, setFormValues } =
    useForm(initialFormValues);

  const resetForm = () => {
    setFormValues(initialFormValues);
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      handleClose={handleClose}
      handleOutsideClick={handleOutsideClick}
    >
      <form
        className="modal__form"
        id="login-modal__form"
        name="modal-form"
        onSubmit={handleSubmit}
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
            Log In
          </button>
          or Sign Up
        </div>
      </form>
    </ModalWithForm>
  );
};

export default LoginModal;
