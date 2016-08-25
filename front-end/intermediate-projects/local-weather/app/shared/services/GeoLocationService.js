/**
 * GeoLocation Service
 *
 * In charge of getting User's coordinates.
 */

angular.module('WeatherApp')

.service('GeoLocationService', [function() {

  /**
   * Returns a boolean indicating whether
   * the browser has geolocation support.
   * @return Boolean
   */
  this.isAvailable = function() {
    return "geolocation" in navigator;
  }

  /**
   * Gets the user's browser coordinates.
   * @param function callback
   * @return null
   */
  this.getCoordinates = function(callback) {
    if (!this.isAvailable()) {
      callback(null, null);
      return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      callback(position.coords.latitude, position.coords.longitude);
    });
  }

}]);
