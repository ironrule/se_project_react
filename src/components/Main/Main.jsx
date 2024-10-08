import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureContext.js";
import { useContext } from "react";
import { ClothingItemContext } from "../../contexts/ClothingItemContext.js";

function Main({ weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { clothingItems } = useContext(ClothingItemContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temperature[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
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
    </main>
  );
}

export default Main;
