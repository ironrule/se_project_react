import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
  const { currentUser } = useContext(CurrentUserContext);
  const clothingItemsByOwner = clothingItems.filter((clothingItem) => {
    return clothingItem.owner === currentUser._id;
  });
  return (
    <section className="clothesSection">
      <div className="clothesSection__text">
        <p>Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothesSection__add-clothes-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {clothingItemsByOwner.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
