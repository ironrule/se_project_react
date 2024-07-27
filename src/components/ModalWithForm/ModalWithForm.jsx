import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleClose,
  handleSubmit,
  handleOutsideClick,
}) {
  /**============================================
   **                Return
   *=============================================**/
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOutsideClick}
    >
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
