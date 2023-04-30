const API_keys = "702d8fe0ff356cf1514fb51068d094a7";
const COORDS = "coords";

const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weatherPt");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_keys}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const icon = json.weather[0].icon;
      getIcon(icon);
      const temparture = json.main.temp;
      weather.innerText = `현재온도 : ${temparture}℃`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coordsObj = {
    lat,
    lon,
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_keys}&units=metric`;
  fetch(url);
  saveCoords(coordsObj);
  const icon = getWeather(lat, lon);
  return icon;
}
function handleGeoError(position) {
  console.log("can't find you");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function getIcon(icon) {
  const link = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const image = new Image();
  image.src = link;
  weatherIcon.appendChild(image);
}

function init() {
  const icon = loadCoords();
}

init();

document.onload = function () {
  console.log("done?");
  //getIcon(id);
};
