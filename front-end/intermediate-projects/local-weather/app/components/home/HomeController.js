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
     * Flag indicating if geoLocator api is allowed.
     * @type Boolean
     */
    $scope.hasLocationForbidden = true;

    /**
     * The sent request.
     */
    var searchRequest = null;

    /**
     * Searches the weather for a given place.
     * @return void
     */
    $scope.searchPlaceWeather = function() {
      if ($scope.placeText.length == 0)
        return;

      searchRequest = weatherService.searchCityWeather($scope.placeText,
        function(result) {
          searchRequest = null;

          if (result.cod != 200) {
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
      $scope.hasWeather = true;
      $scope.hasErrors = false;

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
      $scope.hasWeather = false;
      $scope.hasErrors = true;

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

    /**
     * Function called when an api call is being made of finished.
     * @return void
     */
    weatherService.isSearchingCallback = function(request, isSearching) {
      $scope.isSearching = isSearching;
    }.bind(this);

    geoLocationService.getCoordinates(function(latitude, longitude) {
      searchRequest = weatherService.searchCoordinateWeather(
        latitude,
        longitude,
        function(result) {

          if (result.cod == 200) {
            displayWeather(result);
            return;
          }
          if (result.cod != 200) {
            displayError(result);
            return;
          }
        }
      );
    }, function() {
      $scope.hasLocationForbidden = true;
    });
  }
]);
