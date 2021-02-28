var appId = "acc9b44ab4211c87be0da69d582326f5";
var searchMethod;
searchWeather("halifax");

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=metric`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });
}
function showTimeLine(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp
    =1331161200&key=AIzaSyAVwtvKY07lNmncRLFQ-CueTmCB9uUr7-g`)
    .then((result) => {
      return result.json();
    })
    .then((result) => {});
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("./images/clear.jpg")';
      break;

    case "Clouds":
      document.body.style.backgroundImage = 'url("./images/cloudy.jpg")';
      break;

    case "Rain":
    case "Mist":
      document.body.style.backgroundImage = 'url("./images/rain.jpg")';
      break;

    case "Drizzle":
      document.body.style.backgroundImage = 'url("./images/drizzle.jpg")';
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("./images/storm.jpg")';
      break;

    case "Snow":
      document.body.style.backgroundImage = 'url("./images/snow.jpg")';
      break;

    default:
      break;
  }
  var weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  var temperatureElement = document.getElementById("temperature");
  var maxMinTemperature = document.getElementById("maxMinTemp");
  var humidityElement = document.getElementById("humidity");
  var windSpeedElement = document.getElementById("windSpeed");
  var cityHeader = document.getElementById("cityHeader");
  var weatherIcon = document.getElementById("documentIconImg");

  weatherIcon.src =
    "http://openweathermap.org/img/wn/" +
    resultFromServer.weather[0].icon +
    ".png";

  var resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176";

  maxMinTemperature.innerHTML =
    Math.floor(resultFromServer.main.temp_max) + "&#176" + " / " +
    Math.floor(resultFromServer.main.temp_min) + "&#176";

  windSpeedElement.innerHTML =
    "Winds " + Math.floor(resultFromServer.wind.speed) + "m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity " + resultFromServer.main.humidity + "%";
}

var input = document. getElementById("searchInput");
input.addEventListener("keyup", function(event) {
  console.log(event.keyCode)
  if (event.keyCode === 13) {
   event.preventDefault();
   searchTerm = event.target.value;
   searchWeather(searchTerm);
  }
});

