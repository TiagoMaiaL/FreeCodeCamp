/**
 * Controls for each temperature.
 */

angular.module('WeatherApp')

.directive('temperatureControls', ['WeatherService', function(weatherService) {
  return {
    templateUrl: 'app/shared/directives/TempControlsTemplate.html',
    restrict: 'E'
  };
}]);