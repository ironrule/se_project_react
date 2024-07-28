import "./DeleteConfirmationModal.css";
import { useState } from "react";

function DeleteConfirmationModal({
  card,
  handleClose,
  isOpen,
  handleSubmit,
  buttonText,
}) {
  const [submitText, setSubmitText] = useState("Yes, delete item");
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
              setSubmitText(buttonText);
              handleSubmit(card);
              setSubmitText("Yes, delete item");
            }}
          >
            {submitText}
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
