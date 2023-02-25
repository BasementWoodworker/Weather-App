function toFahrenheit(celsius) {
  return Math.round(celsius * 1.8 + 32);
}

function toCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) / 1.8);
}

function toMph(kmh) {
  return Math.round(kmh / 1.609);
}

function toKmh(mph) {
  return Math.round(mph * 1.609);
}

export default {
  toFahrenheit,
  toCelsius,
  toMph,
  toKmh
}