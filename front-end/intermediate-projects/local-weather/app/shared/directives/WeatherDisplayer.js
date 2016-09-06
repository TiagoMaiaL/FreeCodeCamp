/**
 * Weather displayer.
 */

angular.module('WeatherApp')

.directive('weatherDisplayer', function() {
  return {
    templateUrl: 'app/shared/directives/weatherDisplayerTemplate.html',
    restrict: 'E',
    replace: true,
    scope: {},
    link: function() {
      // TODO: Add method to get 
    }
  }
});