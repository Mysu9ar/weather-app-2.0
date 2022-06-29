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

function transformDay(datenumber) {
  let date = new Date(datenumber * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

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

function getForecast(coordinates) {
  let apiKey = "85a5dbf30e733b0f6b4252e330196182";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(showForecast);
}

function showNewTemp(response) {
  let city = document.querySelector("#main-city");
  city.innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(celsiusTemp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;

  let description = document.querySelector("li#description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let humidity = document.querySelector("li#humi");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let speed = document.querySelector("li#wind");
  speed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/sec`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#far");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", showCelcius);

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

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastLoop = response.data.daily;

  let forecastHTML = `<div class="row" #forecast-table>`;
  forecastLoop.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col" #column>
                  <h5 class="card-title">
                      <img src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png" class="forecast-icon"/>
                  </h5>
                  <p class="min-temp">${Math.round(forecastDay.temp.min)}°</p>
                  <span class="max-temp">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <p class="card-temp">${transformDay(forecastDay.dt)}</p>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

findCity("Kyiv");
