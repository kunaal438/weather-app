const icon = document.querySelector('.icon');
const temp = document.querySelector('.temperature');
const descrp = document.querySelector('.description');
const locationElement = document.querySelector('.location');
const notify = document.querySelector('.notification');

const weather = {};

weather.temperature = {
    unit: "celsius"
}

const Kelvin = 273;

const apiKey = '1dc894da5534ae43f4f68dd15b32bbf6';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notify.style.display = "block";
    notify.innerHTML = "Geolocation is not supported by this browser.";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notify.style.display = "block";
    notify.innerHTML = error.message;
}

function getWeather(lat, lon) {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${apiKey}`;

    fetch(api)
    .then(response => response.json())
    .then(data => {
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country; 
    })
    .then(() => {
        displayWeather();
    })
}

function displayWeather(){
    temp.innerHTML = `${weather.temperature.value}°C`;
    descrp.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    icon.setAttribute('src', `icons/${weather.iconId}.png`);
}