function toFahrenheit(string) {
  const celsius = _extractNumbers(string);
  const fahrenheit = Math.round(celsius * 1.8 + 32);
  return fahrenheit+"°F";
}

function toCelsius(string) {
  const fahrenheit = _extractNumbers(string);
  const celsius = Math.round((fahrenheit - 32) / 1.8);
  return celsius+"°C";
}

function toMph(string) {
  const kmh = _extractNumbers(string);
  const mph = Math.round(kmh / 1.609);
  return `Wind: ${mph} mph`;
}

function toKmh(string) {
  const mph = _extractNumbers(string);
  const kmh = Math.round(mph * 1.609);
  return `Wind: ${kmh} kmh`;
}

function _extractNumbers(string) {
  const numberArray = string.match(/\d/g);
  return Number (numberArray.join(""));
}

export default {
  toFahrenheit,
  toCelsius,
  toMph,
  toKmh
}