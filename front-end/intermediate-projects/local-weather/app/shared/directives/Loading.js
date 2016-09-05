/**
 * Loading indicator.
 */

angular.module('WeatherApp')

.directive('loadIndicator', function() {
  return {
    templateUrl: 'app/shared/directives/LoadingTemplate.html',
    restrict: 'E',
    replace: true,
    scope: {
      loading: '@'
    }
  }
});