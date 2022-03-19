var weatherEl = document.querySelector("#weather-container");
var cityEl = document.querySelector(".cityName");
var weatherDataEl = document.querySelector(".weather-data li");
var cityInput = document.querySelector("#city");
const submitBtn = document.getElementById("submit");


const weather = {
    Temp: 90,
    Wind: 66,
    Humidity: 100,
    UVIndex: 99
};



var printWeather = function () {
    // cityEl.innerHTML = weather.city;
    // weatherDataEl.innerHTML = "Temp: " + weather.temp;
    // }
    cityEl.textContent = cityInput;
    for (const elm in weather) {
        var test = document.createElement('li');
        test.textContent = (`${elm} = ${weather[elm]}`);
        weatherDataEl.appendChild(test);
    }
    console.log(cityInput);
};


$("#submit").click(printWeather);


