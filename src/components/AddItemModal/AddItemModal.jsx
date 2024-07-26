import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { addClothingItem } from "../../utils/api";

function AddItemModal({ isOpen, handleClose, addItem }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weatherType, setWeatherType] = useState("");
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
      weather: weatherType,
      imageUrl: imageUrl,
    };
    addClothingItem(newItem)
      .then((item) => {
        addItem((items) => [...items, item]);
      })
      .then(handleClose)
      .catch(console.error);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleAddItemSubmit}
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
          onChange={handleNameChange}
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
          onChange={handleUrlChange}
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
            name="weather-type"
            className="modal__radio-input"
            id="hot"
            value="hot"
            onChange={handleWeatherTypeChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather-type"
            className="modal__radio-input"
            id="warm"
            value="warm"
            onChange={handleWeatherTypeChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather-type"
            className="modal__radio-input"
            id="cold"
            value="cold"
            onChange={handleWeatherTypeChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
