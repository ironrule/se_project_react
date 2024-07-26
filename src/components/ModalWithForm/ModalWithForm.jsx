import "./ModalWithForm.css";
import { useCallback, useEffect, useRef } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleClose,
  handleSubmit,
}) {
  /**============================================
   **     Modal Close by Mouse Click Outside
   *=============================================**/

  const ref = useRef(null);
  const handleClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal_opened")) {
        handleClose();
      }
    },
    [handleClose, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  /**============================================
   **          Escape Key Modal Close
   *=============================================**/
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscKey, false);

    return () => {
      document.removeEventListener("keyup", handleEscKey, false);
    };
  }, [handleEscKey]);

  /**============================================
   **          Return of modal info
   *=============================================**/

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleClose} type="button" className="modal__close" />
        <form
          className="modal__form"
          id="modal__form"
          name="modal-form"
          onSubmit={handleSubmit}
        >
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
