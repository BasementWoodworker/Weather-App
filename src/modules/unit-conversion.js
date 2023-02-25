function toFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) / 1.8
}

export default {
  toFahrenheit,
  toCelsius
}