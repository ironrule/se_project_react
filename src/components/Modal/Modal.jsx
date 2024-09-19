import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({ children, title, isOpen, handleClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        {children}
        <button className="modal__close" type="button" onClick={handleClose} />
      </div>
    </div>
  );
};
