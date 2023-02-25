import createElem from "./create-element-custom-function.js";
import convert from "./unit-conversion.js";
import circleImg from "../assets/images/circle.svg";

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
  const weatherIcon = createElem("img", {Class: "weather-icon"});
  const temperature = createElem("div", {Class: "temperature", Content: `${data.temp}°C`});
  const temperatureFeels = createElem("div", {Class: "temperature-feels", Content: `Feels like ${data.tempFeels}°C`});
  const wind = createElem("div", {Class: "wind", Content: `Wind: ${data.wind} km/h`});
  const humidity = createElem("div", {Class: "humidity", Content: `Humidity: ${data.humidity}%`});
  const toggleUnitsLabel = createElem("label", {Class: "toggle-units", Content: "METRIC"});
  const toggleUnits = createElem("div", {Class: "toggle-units"});
  const toggleUnitsChild = createElem("div", {Class: "toggle-units-child"});
  const circle = createElem("img", {Class: "weather-circle"});
  const leftSide = createElem("div", {Class: "left-side"});
  const rightSide = createElem("div", {Class: "right-side"});

  circle.src = circleImg;
  circle.style.color = "red";
  toggleUnits.appendChild(toggleUnitsChild);
  weatherIcon.src = data.iconURL;

  main.append(weatherContainer);
  weatherContainer.append(
    locationName,
    leftSide,
    rightSide,
    toggleUnitsLabel,
    toggleUnits
  );
  leftSide.append(
    circle,
    temperature,
    temperatureFeels
  )
  rightSide.append(
    weatherIcon,
    weather,
    humidity,
    wind
  )

  toggleUnits.addEventListener("click", () => {
    toggleUnits.classList.toggle("changed");
    if (toggleUnitsLabel.textContent === "METRIC") {
      toggleUnitsLabel.textContent = "IMPERIAL";
      temperature.textContent = convert.toFahrenheit(temperature.textContent);
      temperatureFeels.textContent = "Feels like " + convert.toFahrenheit(temperatureFeels.textContent);
      wind.textContent = convert.toMph(wind.textContent);
    } else {
      toggleUnitsLabel.textContent = "METRIC";
      temperature.textContent = convert.toCelsius(temperature.textContent);
      temperatureFeels.textContent = "Feels like " + convert.toCelsius(temperatureFeels.textContent);
      wind.textContent = convert.toKmh(wind.textContent);
    }
  })
}

export default {
  locationInput,
  searchButton,
  showWeather
}