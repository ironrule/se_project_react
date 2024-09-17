import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ClothingItemContext } from "../../contexts/ClothingItemContext";

function ItemCard({ item, onCardClick }) {
  const { handleCardLike } = useContext(ClothingItemContext);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const onCardLike = (e) => {
    e.stopPropagation();
    handleCardLike(item._id, isLiked);
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
            onClick={onCardLike}
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
