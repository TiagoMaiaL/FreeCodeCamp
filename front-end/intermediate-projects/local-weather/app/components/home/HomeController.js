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
     * Displays the weather using the scope.
     * @param  Object result
     * @return void
     */
    var displayWeather = function(result) {
      $scope.weather = result.list[0];
      $scope.cityName = result.city.name;
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
