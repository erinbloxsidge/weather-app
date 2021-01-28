//Correct Date and Time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

// Temp Converstion
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempConversion = document.querySelector("#temperature");
  let temperature = tempConversion.innerHTML;
  tempConversion.innerHTML = Math.round(((temperature * 9) / 5) * 32);
}

//Change city using Search Button
function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = temperature;

  let city = response.data.name;
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = city;

  let describeCondition = response.data.weather[0].description;
  let currentDescript = document.querySelector("#current-description");
  currentDescript.innerHTML = describeCondition;

  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  

  let apiKey = "5af0dbf482cffaf70daccf38ac12ef72";
  let cityName = response.data.main;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
}

function showForcast() {
document.querySelector("");
}

// Unfinished
function showAirQuality(response){
  document.querySelector("#air-quality").innerHTML = response.list.main.aqi;

  let apiKey ="5af0dbf482cffaf70daccf38ac12ef72";
  
  let apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=${apiKey}`;

  axios.get(apiUrl).then(showAirQuality);
}

function searchLocation(city) {
  let apiKey = "5af0dbf482cffaf70daccf38ac12ef72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
  //axios.get(apiUrl).then(showForcast);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchLocation(city);
}

//Location Button Functions
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = temperature;

  let city = response.data.name;
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = city;

  let describeCondition = response.data.weather[0].description;
  let currentDescript = document.querySelector("#current-description");
  currentDescript.innerHTML = describeCondition;
}

function currentLocation(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;

  let apiKey = "5af0dbf482cffaf70daccf38ac12ef72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event){
  event.preventDefault();
navigator.geolocation.getCurrentPosition(currentLocation);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentDay = document.querySelector("#today");
let currentTime = new Date();
currentDay.innerHTML = formatDate(currentTime);

let form = document.querySelector("form");
form.addEventListener("submit", citySubmit);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

searchLocation("London");