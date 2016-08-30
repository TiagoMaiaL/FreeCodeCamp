/**
 * Home Controller file.
 */

angular.module('WeatherApp')

.controller('SearchController', [
  '$scope',
  'WeatherService',
  function(
    $scope,
    weatherService
  ) {
    /**
     * The search text typed by the user.
     * @type String
     */
    $scope.placeText = '';

    /**
     * Searches the weather for a given place.
     * @return void
     */
    $scope.searchPlaceWeather = function() {
      // TODO: Make a request with the weather API.
    }
  }
]);