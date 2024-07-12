import "./WeatherCard.css";
import sunny from "../../images/sunny.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={sunny} alt="Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
