const apiKey = 'd977538fe5aece4d95bdbabd1682f20b';

const locationElement = document.getElementById('location');
const temperaturElement = document.getElementById('temperatur');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');

async function getWeather(latitude, longitude) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&unit=metric&appid=${apiKey}`

    try{
        const response = await fetch(apiURL)
        const data = await response.json()

        console.log(data)
        locationElement.textContent = `${data.name}, ${data.sys.country}`
        temperaturElement.textContent = `Temperatur:${data.main.temp}°C`
        descriptionElement.textContent = `Description:${data.weather[0].description}`

        const image = data.weather[0].icon 
        weatherIconElement.innerHTML = `<img src="//openweathermap.org/img/wn/${image}.png" alt="Image Icon">`
    }catch(error){
        console.error('Error fetching weather data: ')
		alert('Failed to fetch weather data. Please try again later')
	}

    
};

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            getWeather(latitude, longitude)

        }, error => {
            alert('Failed to get your location. Please Enable location services')
        })
    }else{
        alert('Geolocation is not supported by your browser')
    }
};

window.onload = getLocation();