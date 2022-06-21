let now = new Date();
let date = document.querySelector("#date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

date.innerHTML = `${day}, ${hours}:${minutes}`;

function showСity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  if (cityInput.value) {
    cityInput.innerHTML = `${cityInput.value}`;
    findCity(cityInput.value);
  } else {
    cityInput.innerHTML = null;
    alert("Please, type a city");
  }
}
let newForm = document.querySelector("#search-form");
newForm.addEventListener("submit", showСity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showСity);

function findCity(city) {
  let apiKey = "54ae8ba91d8b30c5425ec1264c36de90";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showNewTemp);
}

function showNewTemp(response) {
  let city = document.querySelector("li#main-city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}°`;

  let humidity = document.querySelector("li#humi");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// show weather in Kyiv
function showWeatherKyiv(response) {
  event.preventDefault();
  let city = "Kyiv";
  findCity(city);
}
let kyivButton = document.querySelector("#kyiv");
kyivButton.addEventListener("click", showWeatherKyiv);

// show weather in Kharkiv
function showWeatherKharkiv(response) {
  event.preventDefault();
  let city = "Kharkiv";
  findCity(city);
}
let kharkivButton = document.querySelector("#kharkiv");
kharkivButton.addEventListener("click", showWeatherKharkiv);

// show weather in Dnipro
function showWeatherDnipro(response) {
  event.preventDefault();
  let city = "Dnipro";
  findCity(city);
}
let dniproButton = document.querySelector("#dnipro");
dniproButton.addEventListener("click", showWeatherDnipro);

// show weather in Odesa
function showWeatherOdesa(response) {
  event.preventDefault();
  let city = "Odesa";
  findCity(city);
}
let odesaButton = document.querySelector("#odesa");
odesaButton.addEventListener("click", showWeatherOdesa);

// show weather in Lviv
function showWeatherLviv(response) {
  event.preventDefault();
  let city = "Lviv";
  findCity(city);
}
let lvivButton = document.querySelector("#lviv");
lvivButton.addEventListener("click", showWeatherLviv);

// getting data from the geo api
document.querySelector("#current").addEventListener("click", () => {
  function currentPosition(position) {
    let geoApiKey = "85a5dbf30e733b0f6b4252e330196182";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=${lon}&appid=${geoApiKey}&units=metric`;

    axios.get(newUrl).then(showNewTemp);
  }
  navigator.geolocation.getCurrentPosition(currentPosition);
});
