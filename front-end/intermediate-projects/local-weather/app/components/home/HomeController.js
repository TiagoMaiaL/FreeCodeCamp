/**
 * Home Controller file.
 */

angular.module('WeatherApp')

.controller('HomeController', [
  '$scope',
  'WeatherService',
  'GeoLocationService',
  function(
    $scope,
    weatherService,
    geoLocationService
  ) {
    // TODO: Get user browser location.
    // TODO: Get city weather info.
  }
]);