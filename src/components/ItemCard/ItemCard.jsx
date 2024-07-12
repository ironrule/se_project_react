import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li onClick={handleCardClick} className="card">
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
