import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, handleClose, card, handleDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return (
    <div
      className={`modal ${activeModal === "item-modal" && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className="modal__content_type_image">
        <button
          onClick={handleClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt={`Picture showing ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__footer-left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__footer-right">
            {isOwner ? (
              <>
                <button
                  type="button"
                  className="modal__delete-item"
                  onClick={handleDeleteClick}
                >
                  Delete item
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
