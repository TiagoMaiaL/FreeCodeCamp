/**
 * Controls for each temperature.
 */

angular.module('WeatherApp')

.directive('temperatureControls', [function() {
  return {
    templateUrl: 'app/shared/directives/TempControlsTemplate.html',
    restrict: 'E',
    scope: {
      temperatureUnit: '='
    }
  };
}]);