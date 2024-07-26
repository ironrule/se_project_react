import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ card, handleClose, isOpen, handleSubmit }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
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
            onClick={() => {
              handleSubmit(card);
            }}
          >
            Yes, delete item
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
