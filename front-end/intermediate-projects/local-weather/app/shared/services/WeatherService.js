/**
 * Weather Service
 *
 * In charge of getting weather
 * info through openWeather API.
 */

angular.module('WeatherApp')

.service('WeatherService', ['$resource', function($resource) {

  /**
   * Resource object.
   * @type Resource
   */
  this.weatherApi = $resource(
    'http://api.openweathermap.org/data/2.5/forecast',
    {
      callback: 'JSON_CALLBACK',
      APPID: 'ced799b76a354f34b29a35705cccaf62'
    },
    {get: {method: 'JSON'}}
  );

  /**
   * Gets the weather at the given coordinate.
   * @param Float latitude
   * @param Float longitude
   * @return Object
   */
  this.getCoordinateWeather = function(latitude, longitude) {
    return this.weatherApi.get({lat: latitude, lon: longitude});
  }

  /**
   * Gets the weather at the given city.
   * @param  String cityName
   * @return Object
   */
  this.getCityWeather = function(cityName) {
    return this.weatherApi.get({q: cityName});
  }

}]);
