const param = {
    'url': 'https://api.openweathermap.org/data/2.5/',
    'appid': 'cac2ae0a3cd14868ec6c79f1fd058ca3'
}

const cities = {
    'Kyiv': 703448,
    'Warsaw': 756135,
    'Prague': 3067696,
    'Berlin': 2950158,
}

function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}c&#176`;
    document.querySelector('.forecast-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector('.info-weather').innerHTML = data.weather[0].description;
    document.querySelector('.info_wind-speed').innerHTML = `${data.wind.speed} m/s`
    document.querySelector('.direction').style.transform = `rotateZ(${data.wind.deg - 46}deg)`;
    document.querySelector('.info_wind-direction').innerHTML = `${data.wind.deg}&#176`
    document.querySelector('.info-pressure').innerHTML = `${data.main.pressure} hpa`
}

let citySelect = document.querySelector('#city');

for (key in cities) {
    let cityOptions = document.createElement("option");
    citySelect.insertAdjacentElement('beforeend', cityOptions)
    cityOptions.value = cities[key];
    cityOptions.textContent = key;
}

getWeather();
document.querySelector('#city').onchange = getWeather;