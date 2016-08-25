/**
 * Free Code Camp
 *
 * Intermediate Front-End Projects.
 *
 * Show The Local Weather solution.
 * https://www.freecodecamp.com/challenges/show-the-local-weather
 */

var ImagesContainer = {
  clearSky : "http://www.dream-wallpaper.com/free-wallpaper/nature-wallpaper/clear-water-and-blue-sky-2-wallpaper/1920x1200/free-wallpaper-15.jpg",
  clouds: "http://forum.nooor.com/imgcache/121505.imgcache.jpg",
  rain: "http://www.sampletekk.com/image/data/product_desc/Rain%20Piano%20MkII/050713rain-620x413.jpg",
  snow: "http://i.telegraph.co.uk/multimedia/archive/02451/readers-snow-deer_2451171b.jpg"
};

var TemperatureUnits = {
  kelvin        : "kelvin",
  fahrenheit    : "fahrenheit",
  celsius       : "celsius"
}

var Weather = function(info) {
  console.log(info)
  if (info) {
    var sourceInfo  = info;
    
    this.temp       = sourceInfo.main.temp;
    this.desc       = sourceInfo.weather[0].description;
    this.main       = sourceInfo.weather[0].main;
    this.iconID     = sourceInfo.weather[0].icon; 
    this.cityName   = sourceInfo.name;
    this.img        = ImagesContainer.clearSky;
    
    var main        = sourceInfo.weather[0].main;
    
    if (
      main == "Clouds"
    ) {
      this.img = ImagesContainer.clouds;
    } else if (
      main == "Rain"
    ) {
      this.img = ImagesContainer.rain;
    } else if (main == "Snow") {
      this.img = ImagesContainer.snow;
    }
    
    this.convertTemperature = function(unit) {
      var temp = null;

      if (unit == TemperatureUnits.kelvin) {
        temp = this.temp;
      } else if (unit == TemperatureUnits.fahrenheit) {
        temp = (this.temp * (9 / 5) - 459.67).toFixed(2);
      } else {
        temp = Math.floor(this.temp - 273.15);
      }
      return temp;
    }
  }
}

var LocationManager = function() {
  var userPosition = {
    latitude    : null,
    longitude   : null
  }
  
  this.userPosition = userPosition;
  
  this.requestUserPosition = function(c) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userPosition.latitude    = position.coords.latitude;
      userPosition.longitude   = position.coords.longitude;
      c(userPosition);
    });
  }
}

var WeatherManager = function() {
  var baseURL = "http://api.openweathermap.org/data/2.5/weather"
  
  this.requestCurrentWeather = function(coordinates, c, e) {
    
    var ajax = new XMLHttpRequest();
    ajax.open(
      "GET", 
      baseURL + 
      "?lat=" + coordinates.latitude + 
      "&lon=" + coordinates.longitude, 
      true
    );
    ajax.onreadystatechange = function() {
      
      if (ajax.readyState == 4 && ajax.status == 200) {
        var response = JSON.parse(ajax.responseText);
        if (typeof(e) == "function" && response.cod != "200") {
          e();
        } else {
          c(response); 
        }
      } 
    }
    ajax.send();
  }
}

var PresentationManager = function(weatherObject) {
  this.weather = weatherObject;
  this.updateInfoView = function() {
    if (this.weather) {
      $("div.container-fluid").css(
        "background-image", 
        "url(" + this.weather.img + ")"
      );
      $("#main").html(this.weather.main + "   |   " + this.weather.temp + " K");
      $("#city").html(this.weather.cityName);
      $("#kelvin").css(
        "text-decoration", 
        "underline"
      );
    }
  }
  this.showError = function() {
    $("#main").html("I don't know nothing about your city. = (");
    $("button").attr("disabled", true);
  }
}

$("document").ready(function() {
  var location              = new LocationManager();
  var weather               = new WeatherManager();
  var presentationManager   = null;
  
  if ("geolocation" in navigator) {
    location = new LocationManager();
    location.requestUserPosition(function(position) {
      weather.requestCurrentWeather(
        position, 
        function(weather) {
          presentationManager = new PresentationManager(new Weather(weather));
          presentationManager.updateInfoView();
        }, 
        function() {
          presentationManager = new PresentationManager(null);
          presentationManager.showError();
        });    
      }
    );
  }
  
  var closure = function(unit, unitStr, c) {
    var temp = presentationManager.weather.convertTemperature(unit);
    $("#main").html(presentationManager.weather.main + "   |   " + temp + " " + unitStr);
    $("button").css(
      "text-decoration", 
      "none"
    );
    c();
  }
  
  $("#kelvin").click(function() {
    closure(TemperatureUnits.kelvin, "K", function() {
      $("#kelvin").css(
        "text-decoration", 
        "underline"
      );
    });
  });
  $("#fahrenheit").click(function() {
    closure(TemperatureUnits.fahrenheit, "F", function() {
      $("#fahrenheit").css(
        "text-decoration", 
        "underline"
      );
    });
  });
  $("#celsius").click(function() {
    closure(TemperatureUnits.celsius , "C", function() {
      $("#celsius").css(
        "text-decoration", 
        "underline"
      );
    });
  });
});
