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
     * The search text typed by the user.
     * @type String
     */
    $scope.placeText = '';

    /**
     * The sent request.
     */
    var searchRequest = null;

    /**
     * Searches the weather for a given place.
     * @return void
     */
    $scope.searchPlaceWeather = function() {
      searchRequest = weatherService.getCityWeather($scope.placeText,
        function(result) {
          displayWeather(result);
          $scope.searchRequest = null;
        }
      );
    }

    /**
     * Displays the weather using the scope.
     * @param  Object result
     * @return void
     */
    var displayWeather = function(result) {
      $scope.cityName = result.name;
      $scope.weather = result.main;
      $scope.weather.date = new Date(result.dt * 1000);
      $scope.description = result.weather[0].main;
    }

    geoLocationService.getCoordinates(function(latitude, longitude) {
      searchRequest = weatherService.getCoordinateWeather(
        latitude,
        longitude,
        function(result) {
          console.log(result);
          displayWeather(result);
        }
      );
    });

  }
]);
