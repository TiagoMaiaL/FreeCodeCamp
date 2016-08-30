/**
 * Free Code Camp
 *
 * Intermediate Front-End Projects.
 *
 * Show The Local Weather solution.
 * https://www.freecodecamp.com/challenges/show-the-local-weather
 */

angular.module('WeatherApp', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/components/home/HomeView.html',
      controller: 'HomeController'
    })
    .when('/search', {
      templateUrl: 'app/components/search/SearchView.html',
      controller: 'SearchController'
    });
}])

.run(['$rootScope', function($rootScope) {
  /**
   * Default temperatureUnit.
   * @type String
   */
  $rootScope.temperatureUnit = 'k';
}]);
