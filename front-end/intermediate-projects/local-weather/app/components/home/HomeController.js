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
     * Flag indicating if the search request was sent.
     * @type Boolean
     */
    $scope.isSearching = false;

    /**
     * Flag indicating if the geo location service was allowed.
     * @type Boolean
     */
    $scope.hasLocation = true;

    /**
     * Searches the weather for a given place.
     * @return void
     */
    $scope.searchPlaceWeather = function() {
      if ($scope.placeText.length == 0)
        return;

      $scope.isSearching = true;

      searchRequest = weatherService.searchCityWeather($scope.placeText,
        function(result) {
          $scope.isSearching = false;
          $scope.searchRequest = null;

          if (result.cod != 200) {
            $scope.weather = null;
            displayError(result);
          }

          displayWeather(result);
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

    /**
     * Displays the error returned while getting weather.
     * @param  Object result
     * @return void
     */
    var displayError = function(result) {
      $scope.cityName = null;
      $scope.weather = null;
      $scope.description = null;

      if (result.cod == 404) {
        $scope.errorMessage = "City not found";
      }

      if (result.cod != 404) {
        $scope.errorMessage = "An error occurred";
      }

      $scope.errorSuggest = 'Please, search for another city';
    }

    $scope.isSearching = true;
    geoLocationService.getCoordinates(function(latitude, longitude) {
      searchRequest = weatherService.searchCoordinateWeather(
        latitude,
        longitude,
        function(result) {
          $scope.isSearching = false;

          if (result.cod == 200) {
            displayWeather(result);
            return;
          }
          if (result.cod != 200) {
            $scope.weather = null;
            displayError(result);
            return;
          }
        }
      );
    }, function() {
      $scope.hasLocation = false;
      $scope.$apply();
    });
  }
]);
