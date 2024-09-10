import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./RegisterModal.css";

const RegisterModal = ({
  handleRegistration,
  isOpen,
  handleClose,
  handleOutsideClick,
  onLoginClick,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(formValues, resetForm);
  };

  const initialFormValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  const { formValues, handleFormChange, setFormValues } =
    useForm(initialFormValues);

  const resetForm = () => {
    setFormValues(initialFormValues);
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      handleClose={handleClose}
      handleOutsideClick={handleOutsideClick}
    >
      <form
        className="modal__form"
        id="register-modal__form"
        name="modal-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="register-modal__input-email" className="modal__label">
          Email*
          <input
            type="email"
            className="modal__input"
            name="email"
            id="register-modal__input-email"
            placeholder="Email"
            required
            minLength="6"
            maxLength="50"
            value={formValues.email}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="register-modal__input-email-error"
          ></span>
        </label>
        <label
          htmlFor="register-modal__input-password"
          className="modal__label"
        >
          Password*
          <input
            type="password"
            className="modal__input"
            name="password"
            id="register-modal__input-password"
            placeholder="Password"
            required
            minLength="8"
            maxLength="40"
            value={formValues.password}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="register-modal__input-password-error"
          ></span>
        </label>
        <label htmlFor="register-modal__input-name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            name="name"
            id="register-modal__input-name"
            placeholder="Name"
            minLength="1"
            maxLength="40"
            value={formValues.name}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="register-modal__input-name-error"
          ></span>
        </label>
        <label htmlFor="register-modal__input-url" className="modal__label">
          Avatar URL
          <input
            type="url"
            className="modal__input"
            name="avatar"
            id="register-modal__input-url"
            placeholder="Avatar URL"
            required
            value={formValues.avatar}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="register-modal__input-url-error"
          ></span>
        </label>
        <div className="register-modal__submit-btn">
          <button type="submit" className="register-modal__submit">
            Next
          </button>
          or{" "}
          <button
            className="register-modal__login-toggle"
            onClick={onLoginClick}
          >
            Log in
          </button>
        </div>
      </form>
    </ModalWithForm>
  );
};

export default RegisterModal;
