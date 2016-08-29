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

    /**
     * Default temperature identifier.
     */
    $scope.temperatureUnit = 'k';

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
      // TODO: Present input to get city text.
    });

  }
]);
