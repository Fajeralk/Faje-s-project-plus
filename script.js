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

function searchCity(city) {
  let apiKey = "3845bbf755c7a6b2d8df3dba924feec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city").value;
  searchCity(city);
}
function searchLocation(position) {
  let latitude = position.cords.latitude;
  let longtitude = position.cords.longtitude;
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
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let temp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#current-weather");
  axios.get(apiUrl).then(showTempreture);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);
