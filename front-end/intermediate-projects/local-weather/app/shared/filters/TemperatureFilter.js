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
    var converted = null;

    switch(unit) {
      case 'c':
        converted = toCelsius(temperature);
        break;

      case 'f':
        converted = toFahrenheit(temperature);
        break;

      default:
        converted = temperature;
    }

    return converted;
  }
}]);

