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

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

return `${hours}:${minutes}`;
}

// Temp Converstion
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenTemp = (celsiusTemperature * 9) / 5 + 32;
  fahrenElement.innerHTML = Math.round(fahrenTemp);
}

function convertToCelsius(event) {
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let celsiusElement = document.querySelector("#temperature");
celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

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

  let sunriseConversion = new Date(response.data.sys.sunrise * 1000);
  hours = sunriseConversion.getUTCHours();
  minutes = sunriseConversion.getUTCMinutes();
  formattedSunrise = hours.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0');
  document.querySelector("#sunrise").innerHTML = formattedSunrise;

  let sunsetConversion = new Date(response.data.sys.sunset * 1000);
  hours = sunsetConversion.getUTCHours();
  minutes = sunsetConversion.getUTCMinutes();
  formattedSunset = hours.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0');
  document.querySelector("#sunset").innerHTML = formattedSunset;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = feelsLike;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = wind;

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.main.temp;
}


function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
        
  <div class="col-sm-2" id="sixday-forecast">         
  <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">

                ${formatHours(forecast.dt * 1000)}

                  <span id="max-day-one"><strong>${Math.round(forecast.main.temp_max)}º</strong></span> | <span id="min-day-one">${Math.round(forecast.main.temp_min)}º</span>
                  </div>
          `;
  }

}

function searchLocation(city) {
  let apiKey = "5af0dbf482cffaf70daccf38ac12ef72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
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

   let sunriseConversion = new Date(response.data.sys.sunrise * 1000);
  hours = sunriseConversion.getUTCHours();
  minutes = sunriseConversion.getUTCMinutes();
  formattedSunrise = hours.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0');
  document.querySelector("#sunrise").innerHTML = formattedSunrise;

  let sunsetConversion = new Date(response.data.sys.sunset * 1000);
  hours = sunsetConversion.getUTCHours();
  minutes = sunsetConversion.getUTCMinutes();
  formattedSunset = hours.toString().padStart(2, '0') + ':' +  
                minutes.toString().padStart(2, '0');
  document.querySelector("#sunset").innerHTML = formattedSunset;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = feelsLike;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = wind;

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let apiKey = "5af0dbf482cffaf70daccf38ac12ef72";
  let cityName = response.data.main;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;

  let apiKey = "5af0dbf482cffaf70daccf38ac12ef72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentLocation(event){
  event.preventDefault();
navigator.geolocation.getCurrentPosition(currentLocation);
}


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentDay = document.querySelector("#today");
let currentTime = new Date();
currentDay.innerHTML = formatDate(currentTime);

let form = document.querySelector("form");
form.addEventListener("submit", citySubmit);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

searchLocation("London,uk");
