import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
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
        {clothingItems.map((item) => {
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
