/**
 * GeoLocation Service
 *
 * In charge of getting User's coordinates.
 */

angular.module('WeatherApp')

.service('GeoLocationService', ['$rootScope', function($rootScope) {

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
   * @param function success
   * @param function failure
   * @return null
   */
  this.getCoordinates = function(success, failure) {
    if (!this.isAvailable()) {
      failure();
      return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      success(position.coords.latitude, position.coords.longitude);
      $rootScope.$apply();
    }, failure);
  }

}]);
