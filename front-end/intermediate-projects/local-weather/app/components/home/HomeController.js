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
    this.isSearching = false;

    /**
     * Searches the weather for a given place.
     * @return void
     */
    $scope.searchPlaceWeather = function() {
      if ($scope.placeText.length == 0)
        return;

      $scope.isSearching = true;

      searchRequest = weatherService.getCityWeather($scope.placeText,
        function(result) {
          $scope.isSearching = false;
          $scope.searchRequest = null;
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

    this.isSearching = true;
    geoLocationService.getCoordinates(function(latitude, longitude) {
      searchRequest = weatherService.getCoordinateWeather(
        latitude,
        longitude,
        function(result) {
          $scope.isSearching = false;

          if (result.cod == 200) {
            displayWeather(result);
            return;
          }
          if (result.cod != 200) {
            displayError(result);
            return;
          }
        }.bind(this)
      );
    });
  }
]);
