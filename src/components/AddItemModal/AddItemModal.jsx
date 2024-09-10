import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({
  isOpen,
  handleClose,
  // handleAddItem,
  handleOutsideClick,
  buttonText,
  handleSubmit,
}) {
  const initialFormValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { formValues, handleFormChange, setFormValues } =
    useForm(initialFormValues);

  const resetForm = () => {
    setFormValues(initialFormValues);
  };

  const handleAddItem = (e, formValues, resetForm) => {
    e.preventDefault();
    const makeRequest = () => {
      return addClothingItem(item).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  // const handleAddItemSubmit = (e) => {
  //   e.preventDefault();
  //   handleAddItem(formValues, resetForm);
  // };

  return (
    <ModalWithForm
      buttonText=""
      title="New garment"
      isOpen={isOpen}
      handleClose={handleClose}
      handleOutsideClick={handleOutsideClick}
    >
      <form
        className="modal__form"
        id="add-item-modal__form"
        name="modal-form"
        onSubmit={handleAddItem}
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
            value={formValues.name}
            onChange={handleFormChange}
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
            value={formValues.imageUrl}
            onChange={handleFormChange}
          />
          <span
            className="modal__input-error modal__card-error"
            id="modal__input-url-error"
          ></span>
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              id="hot"
              checked={formValues.weather === "hot"}
              value="hot"
              onChange={handleFormChange}
              required
            />
            <span>Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              id="warm"
              checked={formValues.weather === "warm"}
              value="warm"
              onChange={handleFormChange}
            />
            <span>Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              id="cold"
              checked={formValues.weather === "cold"}
              value="cold"
              onChange={handleFormChange}
            />
            <span>Cold</span>
          </label>
        </fieldset>
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </ModalWithForm>
  );
}

export default AddItemModal;
