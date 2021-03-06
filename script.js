function dateFormat(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = days[date.getDay()];
  let day = dayIndex;
  return `${day}. ${month}/${exactDate}/${year}. ${hours}:${minutes}`;
}

let dateIndex = document.querySelector("#current-date");
let now = new Date();
let exactDate = now.getDate();
dateIndex.innerHTML = dateFormat(now);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempCurrent = document.querySelector("#current-weather");
  let fahTemp = Math.round(celsiusTemp * 9) / 5 + 32;
  tempCurrent.innerHTML = `${fahTemp} °F `;
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempCurrent = document.querySelector("#current-weather");
  tempCurrent.innerHTML = `${Math.round(celsiusTemp)} °C `;
}
let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fah");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", convertToCelsius);

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-weather").innerHTML = Math.round(
    response.data.main.temp
  );
}

function formatForecastDay(timestamp) {
  let date = new date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function formatTime(timestamp) {
  let date = new date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentHour}:${currentMinute}`;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-hours");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${dateFormat(new Date(forecast.dt * 1000))}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "3845bbf755c7a6b2d8df3dba924feec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#query").value;
  searchCity(city);
}
function searchLocation(position) {
  let lati = position.coords.latitude;
  let longt = position.coords.longtitude;
  let city = document.querySelector("#current-city");
  let search = document.querySelector("#query");
  city.innerHTML = search.value;
  let unit = "metric";
  let apiKey = "3845bbf755c7a6b2d8df3dba924feec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemperature(response) {
  let img = document.querySelector("#current-temp-icon");
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#current-weather");
  heading.innerHTML = ` ${temp} °C`;

  document.querySelector(
    "#current-description"
  ).innerHTML = `Weather currently : ${response.data.weather[0].description}`;

  document.querySelector("#current-wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
  celsiusTemp = Math.round(response.data.main.temp);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);
