import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getToken } from "../../utils/token";
import { addCardLike, removeCardLike } from "../../utils/api";
import { ClothingItemContext } from "../../contexts/ClothingItemContext";

function ItemCard({ item, onCardClick }) {
  const { setClothingItems } = useContext(ClothingItemContext);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const handleCardClick = (e) => {
    e.stopPropagation();
    onCardClick(item);
  };

  const handleCardLike = (id, isLiked, e) => {
    e.stopPropagation();
    const token = getToken();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch(console.error);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__text-container">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-btn${
              isLiked ? " card__like-btn_active" : ""
            }`}
            onClick={(e) => {
              handleCardLike(item._id, isLiked, e);
            }}
          />
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={`Picture showing ${item.name}`}
      />
    </li>
  );
}

export default ItemCard;
