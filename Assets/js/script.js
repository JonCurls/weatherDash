var weatherEl = document.querySelector("#weather-container");
var cityEl = document.querySelector(".cityName");
var weatherDataEl = document.querySelector(".weather-data li");
var cityInput = document.querySelector("#city");
// var forecastEl = document.querySelector(".forecast-body");
var current = {};
var forecast = {};
var submitBtn = document.querySelector(".submitBtn");
var appId = "f4b74f4236f0eb1a65c89d0e0595e239";
var searchHistory = [];

var getweather = function (cityName) {
  cityInput.value = "";
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      appId
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      return [lat, lon];
    })
    .then(function (value) {
      getForecast(value);
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          value[0] +
          "&lon=" +
          value[1] +
          "&appid=" +
          appId +
          "&units=imperial"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          current.temp = Math.floor(data.current.temp);
          current.humidity = data.current.humidity;
          current.wind = data.current.wind_speed;
          current.uvi = data.current.uvi;
          printWeather();
        });
    });
};

var getForecast = function (data) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      data[0] +
      "&lon=" +
      data[1] +
      "&appid=" +
      appId +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < 5; i++) {
        forecast["day" + i] = data.daily[i];
      }
      printForecast(forecast);
    });
};

var cityLookup = function () {
  console.log(cityInput.value);
  cityName = cityInput.value;
  console.log(cityName);
  saveCity(cityName);
  getweather(cityName);
  cityInput.value.value = "";
};

var saveCity = function (cityName) {
  let newCity = searchHistory.push(cityName);
  localStorage.setItem("cityHistory", searchHistory);
  console.log(searchHistory);
};

var printWeather = function () {
  $(".weather-data").empty();
  $(".cityName").empty();
  $(".cityName").append(cityName);
  $(".weather-data").append("Temp: " + current.temp + "\xB0F");
  $(".weather-data").append("<br />Wind Speed: " + current.wind + " MPH");
  $(".weather-data").append("<br />Humidity: " + current.humidity + "%");
  $(".weather-data").append("<br />UV Index: " + current.uvi);
};

var printForecast = function (forecast) {
  console.log(forecast);
  console.log(forecast.day0.temp.day);
  $(".forecast-body").empty();
  //i < 5
  for (i = 0; i < 2; i++) {
    var forecastEl = document.querySelector("#forecast-container");
    var divEl = document.createElement("div");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humEl = document.createElement("p");

    // $(".forecast-body").append(".divEl");
    // forecastEl.appendChild();
    $(forecastEl).append(
      "<br />Temp: " + forecast["day" + i].temp.day + "\xB0F",
      "<br />Wind: " + forecast["day" + i].wind_speed + " MPH",
      "<br />Humidity: " + forecast["day" + i].humidity + "%"
    );
    $(".forecast-title").append(forecastEl);
  }
};

$(".submitBtn").click(cityLookup);

$(".austinBtn").click(function () {
  cityName = "Austin";
  saveCity(cityName);
  getweather(cityName);
});

$(".chicagoBtn").click(function () {
  cityName = "Chicago";
  saveCity(cityName);
  getweather(cityName);
});

$(".newYorkBtn").click(function () {
  cityName = "new York";
  saveCity(cityName);
  getweather(cityName);
});

$(".miamiBtn").click(function () {
  cityName = "Miami";
  saveCity(cityName);
  getweather(cityName);
});

$(".franciscoBtn").click(function () {
  cityName = "San Francisco";
  saveCity(cityName);
  getweather(cityName);
});

$(".seattleBtn").click(function () {
  cityName = "Seattle";
  saveCity(cityName);
  getweather(cityName);
});

$(".denverBtn").click(function () {
  cityName = "Denver";
  saveCity(cityName);
  getweather(cityName);
});

$(".atlantaBtn").click(function () {
  cityName = "Atlanta";
  saveCity(cityName);
  getweather(cityName);
});
