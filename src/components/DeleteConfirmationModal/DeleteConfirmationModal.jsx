import React, { useContext } from "react";
import "./DeleteConfirmationModal.css";
import { getToken } from "../../utils/token";
import { deleteClothingItem } from "../../utils/api";
import { ClothingItemContext } from "../../contexts/ClothingItemContext.js";
function DeleteConfirmationModal({
  card,
  handleClose,
  isOpen,
  handleSubmit,
  handleOutsideClick,
  buttonText,
}) {
  const { setClothingItems } = useContext(ClothingItemContext);
  const handleDeleteConfirmed = (e) => {
    e.preventDefault();
    const token = getToken();
    const makeRequest = () => {
      return deleteClothingItem(card._id, token).then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id)
        );
      });
    };
    handleSubmit(makeRequest);
  };
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOutsideClick}
    >
      <div className="deleteModal__content">
        <button onClick={handleClose} type="button" className="modal__close" />
        <div className="deleteModal__text">
          <p className="deleteModal__warning-text">
            Are you sure you want to delete this item?
          </p>
          <p className="deleteModal__warning-text">
            This action is irreversible
          </p>
          <button
            type="button"
            className="deleteModal__submit"
            onClick={handleDeleteConfirmed}
          >
            {buttonText}
          </button>
          <button
            type="button"
            className="deleteModal__cancel"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
