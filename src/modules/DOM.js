import createElem from "./create-element-custom-function.js";
import convert from "./unit-conversion.js";

const startingBackground_Url = "https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"

const body = document.body;
const main = document.createElement("main");
const searchContainer = createElem("div", {Class: "search-container"});
const locationInput = createElem("input", {Class: "location-input"});
const searchButton = createElem("button", {Class: "search-button", Content: "➡"});
locationInput.setAttribute("value", "London");
locationInput.setAttribute("placeholder", "...");
body.appendChild(main);
main.appendChild(searchContainer);
searchContainer.append(
  locationInput,
  searchButton
)
body.style.backgroundImage = `url(${startingBackground_Url})`;

function showWeather(data) {
  const weatherContainer = createElem("div", {Class: "weather-container"});
  const locationName = createElem("div", {Class: "location-name", Content: data.locationName});
  const weather = createElem("div", {Class: "weather", Content: data.weather});
  const temperature = createElem("div", {Class: "temperature", Content: data.temp});
  const temperatureFeels = createElem("div", {Class: "temperature-feels", Content: data.tempFeels});
  const wind = createElem("div", {Class: "wind", Content: data.wind});
  const humidity = createElem("div", {Class: "humidity", Content: data.humidity});
  const toggleUnitsLabel = createElem("label", {Content: "°C"});
  const toggleUnits = createElem("input", {Class: "toggle-units"});
  toggleUnits.setAttribute("type", "checkbox");
  main.append(weatherContainer);
  weatherContainer.append(
    locationName,
    weather,
    temperature,
    temperatureFeels,
    wind,
    humidity,
    toggleUnitsLabel,
    toggleUnits
  )

  toggleUnits.addEventListener("click", () => {
    if (toggleUnitsLabel.textContent === "°C") {
      toggleUnitsLabel.textContent = "°F";
      temperature.textContent = convert.toFahrenheit(temperature.textContent);
      temperatureFeels.textContent = convert.toFahrenheit(temperatureFeels.textContent);
    } else {
      toggleUnitsLabel.textContent = "°C";
      temperature.textContent = convert.toCelsius(temperature.textContent);
      temperatureFeels.textContent = convert.toCelsius(temperatureFeels.textContent);
    }
  })
}

export default {
  locationInput,
  searchButton,
  showWeather
}