import { request } from "./api.js";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  );
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temperature = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temperature.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 75) {
    return "hot";
  } else if (temperature >= 60 && temperature < 75) {
    return "warm";
  } else {
    return "cold";
  }
};
