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
     * The sent request.
     */
    this.searchRequest = null;

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
      this.searchRequest = weatherService.getCityWeather($scope.placeText,
        function(result) {
          // TODO: Display the results.
        }
      );
    }

  }

]);