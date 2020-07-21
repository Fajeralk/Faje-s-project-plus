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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahTemp = Math.round(celsiusTemp * 9) / 5 + 32;
  let tempCurrent = document.querySelector("#current-temp");
  tempCurrent.innerHTML = `${fahTemp} °F `;
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempCurrent = document.querySelector("#current-temp");
  tempCurrent.innerHTML = Math.round(`${celsiusTemp} °C `);
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
function searchCity(city) {
  let apiKey = "3845bbf755c7a6b2d8df3dba924feec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].main;
  let temp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#current-weather");
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);
