import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  isOpen,
  handleClose,
  handleOutsideClick,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOutsideClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleClose} type="button" className="modal__close" />
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
