import apiConfig from "./constants.js";

const getWeather = ({ latitude, longitude, apiURL, apiKey }) => {
  fetch(
    `${apiURL}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  );
  console.log(getWeather(apiConfig));
  //format in json
  //return necessary data
};

// export default getWeather;
