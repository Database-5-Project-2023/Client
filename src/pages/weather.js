const tempSection = document.querySelector('.temperature'); // 현재 기온
const tempMaxSection = document.querySelector('.temp-max'); // 최고 기온
const tempMinSection = document.querySelector('.temp-min'); // 최저 기온
const placeSection = document.querySelector('.place'); // 현재 위치(시 단위로 표기)
const descSection = document.querySelector('.description'); // 설명(맑음, 흐림 등)
const iconSection = document.querySelector('.icon'); // 날씨 아이콘
const windSection = document.querySelector('.wind'); // 풍속
const humiditySection = document.querySelector('.humidity'); // 습도

const API_KEY = 'a4eef2ed0290a18772040188f87d1b65';

document.addEventListener('DOMContentLoaded', () => {
    askForLocationPermission();
});

function refreshWeather() {
    askForLocationPermission();
}

const askForLocationPermission = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeather(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by your browser.');
    }
};

const getWeather = (lat, lon) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
    .then(response => response.json())
    .then(json => {
        const temperature = json.main.temp;
        const place = json.name;
        const description = json.weather[0].description;
        const wind = json.wind.speed;
        const humidity = json.main.humidity;
        const tempMax = json.main.temp_max; 
        const tempMin = json.main.temp_min; 
  
        tempSection.innerText = `${temperature} °C`;
        tempMaxSection.innerText = `${tempMax} °C`;
        tempMinSection.innerText = `${tempMin} °C`;
        placeSection.innerText = `${place}`;
        descSection.innerText = description;
        windSection.innerText = `${wind} m/s`;
        humiditySection.innerText = `${humidity}%`;

        const icon = json.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        iconSection.setAttribute('src', iconURL);

        console.log(json);
    })
    .catch((error) => {
        alert(error);
    });
}
