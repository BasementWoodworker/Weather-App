import createElem from "./create-element-custom-function.js";
import convert from "./unit-conversion.js";
import circleImg from "../assets/images/circle.svg";
import backgroundImg from "../assets/images/background.jpg"

function Color(filterColor, normalColor) {
  this.filterColor = filterColor;
  this.normalColor = normalColor;
}

const veryCold = new Color("invert(62%) sepia(91%) saturate(552%) hue-rotate(180deg) brightness(103%) contrast(98%)", "#73bffd");
const cold = new Color("invert(71%) sepia(92%) saturate(1240%) hue-rotate(180deg) brightness(104%) contrast(102%)", "#86c9ff");
const cool = new Color("invert(85%) sepia(56%) saturate(606%) hue-rotate(178deg) brightness(105%) contrast(103%)", "#cbe7ff");
const warmish = new Color("invert(96%) sepia(7%) saturate(3537%) hue-rotate(307deg) brightness(107%) contrast(101%)", "#ffd4a3");
const warm = new Color("invert(75%) sepia(27%) saturate(914%) hue-rotate(335deg) brightness(104%) contrast(101%)", "#ffbb6e");
const hot = new Color("invert(62%) sepia(76%) saturate(1553%) hue-rotate(344deg) brightness(102%) contrast(104%)", "#ff941b");
const veryHot = new Color("invert(55%) sepia(51%) saturate(3333%) hue-rotate(346deg) brightness(99%) contrast(105%)", "#ff6f1b");
let infoPresent = false;

// Initial page build
const body = document.body;
const main = document.createElement("main");
const intro = createElem("h1", {Class: "intro", Content: "Know weather in:"});
const searchContainer = createElem("div", {Class: "search-container"});
const locationInput = createElem("input", {Class: "location-input"});
const searchButton = createElem("span", {Class: "search-button"});
const searchSymbol = createElem("span", {Class: "search-symbol", Content: "➡"})
locationInput.setAttribute("placeholder", "...");
body.append(
  intro, 
  main
);
main.appendChild(searchContainer);
searchContainer.append(
  locationInput,
  searchButton
)
searchButton.appendChild(searchSymbol);
body.style.backgroundImage = `url(${backgroundImg})`;

// Functions
function showWeather(data) {
  const weatherContainer = createElem("div", {Class: "weather-container"});
  const locationName = createElem("div", {Class: "location-name", Content: data.locationName});
  const line = createElem("div", {Class: "line"});
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
  
  toggleUnits.appendChild(toggleUnitsChild);
  weatherIcon.src = data.iconURL;
  if (data.time === "day") weatherIcon.classList.add("day");
  else weatherIcon.classList.add("night");

  main.append(weatherContainer);
  weatherContainer.append(
    locationName,
    line,
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
    humidity,
    weather,
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

  setTemperatureColor(circle, temperature, data.temp);
  intro.remove();
  if (body.lastChild.classList.contains("error")) {
    body.lastChild.remove();
  }
  
  infoPresent = true;
}

function clearWeather() {
  if (infoPresent) main.removeChild(main.lastChild);
}

function setTemperatureColor(circle, temperatureElem, temperature) {
  let color;
  if (temperature > 35) color = veryHot;
  else if (temperature > 25) color = hot;
  else if (temperature > 20) color = warm;
  else if (temperature > 15) color = warmish;
  else if (temperature > 5) color = cool;
  else if (temperature > -10) color = cold;
  else color = veryCold;
  circle.style.filter = color.filterColor;
  temperatureElem.style.color = color.normalColor;
}

function showErrorMessage(errorText) {
  const error = createElem("div", {Class: "error", Content: errorText});
  body.appendChild(error);
  setTimeout(() => error.classList.add("shown"), 100);
  setTimeout(() => error.remove(), 3000);
}

export default {
  locationInput,
  searchButton,
  showWeather,
  clearWeather,
  showErrorMessage
}