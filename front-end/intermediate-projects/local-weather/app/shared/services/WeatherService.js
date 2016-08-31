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
  this.api = $resource(
    'http://api.openweathermap.org/data/2.5/weather', {
      APPID: 'ced799b76a354f34b29a35705cccaf62'
    }, {
      getCityWeather: {method: 'get', cancellable: true}
    }
  );

  /**
   * Gets the weather at the given coordinate.
   * @param Float latitude
   * @param Float longitude
   * @param Function responseCallback
   * @return Object
   */
  this.getCoordinateWeather = function(latitude, longitude, responseCallback) {
    return this.api.getCityWeather(
      {lat: latitude, lon: longitude},
      responseCallback
    );
  }

  /**
   * Gets the weather at the given city.
   * @param  String cityName
   * @param  Function responseCallback
   * @return Object
   */
  this.getCityWeather = function(cityName, responseCallback) {
    return this.api.getCityWeather({q: cityName}, responseCallback);
  }

}]);
