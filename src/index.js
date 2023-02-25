import "./style.css";
import DOM from "./modules/DOM.js";

async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8aa42f3c2e81314f17d3da99b65a61f9`,
    {mode: "cors"}
  );
  console.log(response);
  const rawWeatherData = await response.json();
  console.log(rawWeatherData);
  return rawWeatherData;
}

function extractWeatherData(rawData) {
  const result = {};
  result.locationName = rawData.name;
  result.temp = Math.round(rawData.main.temp);
  result.tempFeels = Math.round(rawData.main.feels_like);
  result.humidity = rawData.main.humidity;
  result.wind = Math.round(rawData.wind.speed);
  result.weather = rawData.weather[0].main;
  result.iconURL = `https://openweathermap.org/img/wn/${rawData.weather[0].icon}@2x.png`;
  return result;
}

DOM.searchButton.addEventListener("click", async () => {
  const rawData = await getWeather(DOM.locationInput.value);
  const processedData = extractWeatherData(rawData);
  DOM.showWeather(processedData);
  DOM.locationInput.value = "";
});