/**
 * Home Controller file.
 */

angular.module('WeatherApp')

.controller('HomeController', [
  '$scope',
  '$rootScope',
  '$location',
  'WeatherService',
  'GeoLocationService',
  function(
    $scope,
    $rootScope,
    $location,
    weatherService,
    geoLocationService
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

    /**
     * Displays the weather using the scope.
     * @param  Object result
     * @return void
     */
    var displayWeather = function(result) {
      $scope.weather = result.main;
      $scope.cityName = result.name;
    }

    geoLocationService.getCoordinates(function(latitude, longitude) {
      weatherService.getCoordinateWeather(
        latitude,
        longitude,
        function(result) {
          displayWeather(result);
        }
      );
    }, function() {
      $location.path('/search');
    });

  }
]);
