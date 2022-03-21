var weatherEl = document.querySelector("#weather-container");
var cityEl = document.querySelector(".cityName");
var weatherDataEl = document.querySelector(".weather-data li");
var cityInput = document.querySelector("#city");
var current = {};
var forecast = {};
var submitBtn = document.querySelector(".submitBtn");
var appId = "f4b74f4236f0eb1a65c89d0e0595e239";
var searchHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
var date = dayjs().format("MM/DD/YYYY");

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
          printWeather(cityName);
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
  cityName = cityInput.value;
  saveCity(cityName);
  getweather(cityName);
  cityInput.value.value = "";
};

var saveCity = function (cityName) {
  var cityBtn = document.createElement("button");
  $(cityBtn).addClass("button");
  cityBtn.innerHTML = cityName;
  var searchEl = document.querySelector(".searchColumn");
  $(searchEl).append(cityBtn);
  searchHistory.push(cityName);
  localStorage.setItem("cityHistory", JSON.stringify(searchHistory));

  $(document).on("click", "#search-history", function (e) {
    cityName = e.target.innerHTML;
    getweather(e.target.innerHTML);
  });
};

var printWeather = function (cityName) {
  $(".weather-data").empty();
  $(".cityName").empty();
  $(".cityName").append(cityName, " ", date);
  $(".weather-data").append("Temp: " + current.temp + "\xB0F");
  $(".weather-data").append("<br />Wind Speed: " + current.wind + " MPH");
  $(".weather-data").append("<br />Humidity: " + current.humidity + "%");
  $(".weather-data").append("<br />UV Index: " + current.uvi);
};

var printForecast = function (forecast) {
  date0 = dayjs().add(1, "day").format("MM/DD/YYYY");

  for (i = 0; i < 5; i++) {
    $("#forecast-container" + i).empty();
  }

  var img0 = document.createElement("img");
  var img1 = document.createElement("img");
  var img2 = document.createElement("img");
  var img3 = document.createElement("img");
  var img4 = document.createElement("img");

  img0.src =
    "https://openweathermap.org/img/wn/" +
    forecast.day0.weather[0].icon +
    "@2x.png";

  img1.src =
    "https://openweathermap.org/img/wn/" +
    forecast.day1.weather[0].icon +
    "@2x.png";

  img2.src =
    "https://openweathermap.org/img/wn/" +
    forecast.day2.weather[0].icon +
    "@2x.png";

  img3.src =
    "https://openweathermap.org/img/wn/" +
    forecast.day3.weather[0].icon +
    "@2x.png";

  img4.src =
    "https://openweathermap.org/img/wn/" +
    forecast.day4.weather[0].icon +
    "@2x.png";

  $("#forecast-container0").append(
    dayjs().add(1, "day").format("MM/DD/YYYY"),
    img0,
    "<br />Temp: " + forecast.day0.temp.day + "\xB0F",
    "<br />Wind: " + forecast.day0.wind_speed + " MPH",
    "<br />Humidity: " + forecast.day0.humidity + "%"
  );
  $("#forecast-container1").append(
    dayjs().add(2, "day").format("MM/DD/YYYY"),
    img1,
    "<br />Temp: " + forecast.day1.temp.day + "\xB0F",
    "<br />Wind: " + forecast.day1.wind_speed + " MPH",
    "<br />Humidity: " + forecast.day1.humidity + "%"
  );
  $("#forecast-container2").append(
    dayjs().add(3, "day").format("MM/DD/YYYY"),
    img2,
    "<br />Temp: " + forecast.day2.temp.day + "\xB0F",
    "<br />Wind: " + forecast.day2.wind_speed + " MPH",
    "<br />Humidity: " + forecast.day2.humidity + "%"
  );
  $("#forecast-container3").append(
    dayjs().add(4, "day").format("MM/DD/YYYY"),
    img3,
    "<br />Temp: " + forecast.day3.temp.day + "\xB0F",
    "<br />Wind: " + forecast.day3.wind_speed + " MPH",
    "<br />Humidity: " + forecast.day3.humidity + "%"
  );
  $("#forecast-container4").append(
    dayjs().add(5, "day").format("MM/DD/YYYY"),
    img4,
    "<br />Temp: " + forecast.day4.temp.day + "\xB0F",
    "<br />Wind: " + forecast.day4.wind_speed + " MPH",
    "<br />Humidity: " + forecast.day4.humidity + "%"
  );
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
