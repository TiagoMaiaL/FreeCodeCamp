/**
 * Temperature filter.
 * Converts the given kelvin temperature to celsius.
 */

angular.module('WeatherApp')

.filter('tempIn', [function() {

  /**
   * Converts the given kelvins to celsius.
   * @param  Int temperature
   * @return Int
   */
  var toCelsius = function(temperature) {
    return Math.ceil(temperature - 273.15);
  }

  /**
   * Converts the given kelvins to fahrenheit.
   * @param  Int temperature
   * @return Int
   */
  var toFahrenheit = function(temperature) {
    return Math.ceil(temperature - 273.15) * 1.8000 + 32;
  }

  return function(temperature, unit) {
    if (!temperature)
      temperature = 0;

    var converted = temperature;

    switch(unit) {
      case 'c':
        converted = toCelsius(temperature);
        converted = converted.toFixed(0);
        break;

      case 'f':
        converted = toFahrenheit(temperature);

      default:
        converted = converted.toFixed(2);
    }

    return converted;
  }
}]);

