/**============================================
 *               API Configuration
 *=============================================**/
// Location: Louisville, Kentucky, USA Coordinates:
// 38.21501391310976, -85.67475727877405
export const coordinates = {
  latitude: "38.21501391310976",
  longitude: "-85.67475727877405",
};

export const apiKey = "1a46fceb87dbf3c3c19a2f20f896ecbd";

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../images/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../images/day/fog.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/day/rain.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../images/day/snow.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../images/day/storm.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../images/night/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../images/night/fog.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/night/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/night/snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../images/night/storm.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    url: new URL("../images/day/default.svg", import.meta.url).href,
    condition: "unknown",
  },
  night: {
    day: false,
    url: new URL("../images/night/default.svg", import.meta.url).href,
    condition: "unknown",
  },
};
