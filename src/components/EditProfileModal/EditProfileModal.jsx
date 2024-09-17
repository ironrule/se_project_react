import React, { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./EditProfileModal.css";
import { getToken } from "../../utils/token.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { editUserInfo } from "../../utils/api";
const EditProfileModal = ({
  isOpen,
  handleClose,
  handleOutsideClick,
  buttonText,
  handleSubmit,
}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const { formValues, handleFormChange, setFormValues } = useForm({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues({ name: currentUser.name, avatar: currentUser.avatar });
    }
  }, [isOpen]);

  function handleProfileFormSubmit(e) {
    e.preventDefault();
    const token = getToken();
    function makeRequest() {
      return editUserInfo(formValues.name, formValues.avatar, token).then(
        (user) => setCurrentUser(user)
      );
    }
    handleSubmit(makeRequest);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      handleClose={handleClose}
      handleOutsideClick={handleOutsideClick}
    >
      <form
        className="modal__form"
        id="edit-profile-modal__form"
        name="modal-form"
        onSubmit={handleProfileFormSubmit}
      >
        <label
          htmlFor="edit-profile-modal__input-email"
          className="modal__label"
        >
          Name*
          <input
            type="text"
            className="modal__input"
            name="name"
            id="edit-profile-modal__input-email"
            placeholder="Name"
            required
            minLength="2"
            maxLength="40"
            value={formValues.name}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="edit-profile-modal__input-name-error"
          ></span>
        </label>
        <label htmlFor="login-modal__input-password" className="modal__label">
          Avatar*
          <input
            type="url"
            className="modal__input"
            name="avatar"
            id="edit-profile-modal__input-password"
            placeholder="Avatar URL"
            required
            minLength="8"
            maxLength="80"
            value={formValues.avatar}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="edit-profile-modal__input-avatar-error"
          ></span>
        </label>
        <div className="edit-profile-modal__submit-btn">
          <button type="submit" className="edit-profile-modal__submit">
            {buttonText}
          </button>
        </div>
      </form>
    </ModalWithForm>
  );
};

export default EditProfileModal;
