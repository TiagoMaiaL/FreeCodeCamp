/**
 * Weather Service
 *
 * In charge of getting weather
 * info through openWeather API.
 */

angular.module('WeatherApp')

.service('WeatherService', ['$resource', function($resource) {

  /**
   * Callback used to return api calls while
   * starting and ending the request.
   */
  // TODO: Refactor the name of this function.
  this.isSearchingCallback = function(){};

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
   * Abstracts the calls to the weather api.
   * @param  Object params
   * @param  Function responseCallback
   * @return Object
   */
  this.getWeather = function(params, responseCallback) {
    var call = this.api.getCityWeather(
      params,
      function(result) {
        this.isSearchingCallback(null, false);
        responseCallback(result);
      }.bind(this)
    );
    this.isSearchingCallback(call, true);

    return call;
  }

  /**
   * Gets the weather at the given coordinate.
   * @param Float latitude
   * @param Float longitude
   * @param Function responseCallback
   * @return Object
   */
  this.searchCoordinateWeather = function(latitude, longitude, responseCallback) {
    return this.getWeather({lat: latitude, lon: longitude}, responseCallback);
  }

  /**
   * Gets the weather at the given city.
   * @param  String cityName
   * @param  Function responseCallback
   * @return Object
   */
  this.searchCityWeather = function(cityName, responseCallback) {
    return this.getWeather({q: cityName}, responseCallback);
  }

}]);
