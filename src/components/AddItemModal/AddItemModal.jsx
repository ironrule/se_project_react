import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({
  isOpen,
  handleClose,
  handleAddItemSubmit,
  handleOutsideClick,
}) {
  const { values, handleChange, setValues } = useForm({});
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit(values);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleOutsideClick={handleOutsideClick}
    >
      <label htmlFor="modal__input-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="modal__input-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="40"
          defaultValue=""
          onChange={handleChange}
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
          name="imageUrl"
          id="modal__input-url"
          placeholder="Image URL"
          required
          defaultValue=""
          onChange={handleChange}
        />
        <span
          className="modal__input-error modal__card-error"
          id="modal__input-url-error"
        ></span>
      </label>
      <fieldset className="modal__radio-buttons" required>
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="hot"
            value="hot"
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="warm"
            value="warm"
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="cold"
            value="cold"
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
