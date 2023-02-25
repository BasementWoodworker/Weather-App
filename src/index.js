import "./style.css";
import DOM from "./modules/DOM.js";

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8aa42f3c2e81314f17d3da99b65a61f9`,
      {mode: "cors"}
    );
    const rawWeatherData = await response.json();
    return rawWeatherData;
  } catch(err) {
    DOM.showErrorMessage("Network Error");
  }
}

function extractWeatherData(rawData) {
  const result = {};
  result.locationName = rawData.name;
  result.temp = Math.round(rawData.main.temp);
  result.tempFeels = Math.round(rawData.main.feels_like);
  result.humidity = rawData.main.humidity;
  result.wind = Math.round(rawData.wind.speed);
  result.weather = rawData.weather[0].main;
  result.iconURL = `https://openweathermap.org/img/wn/${rawData.weather[0].icon}@4x.png`;
  result.time = (rawData.weather[0].icon[2] === "d") ? "day" : "night";
  return result;
}

// Main logic
DOM.searchButton.addEventListener("click", async () => {
    if (DOM.locationInput.value === "") return;
    const rawData = await getWeather(DOM.locationInput.value);
    if (rawData.cod === "404") {
      DOM.showErrorMessage("Location not found");
      return;
    }
    const processedData = extractWeatherData(rawData);
    DOM.clearWeather();
    DOM.showWeather(processedData);
    DOM.locationInput.value = "";
});

// Comfort Features
window.addEventListener("keyup", (event) => {
  if (event.key === "Enter") DOM.searchButton.click();
})
window.addEventListener("load", () => DOM.locationInput.focus());