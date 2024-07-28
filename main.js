const apiKey = '028c03d45e069148e45a04ffd902d490';

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        return await response.json();

    }catch(error){
        console.error('Error fetching weather data', error);
    }
}



document.addEventListener('DOMContentLoaded', () =>{
const btn = document.getElementById('sub-btn');
btn.addEventListener('click', async () =>{
        city = document.getElementById('input-box').value;
        if(city){
            const data = await getWeatherData(city);
            setWeatherInfo(data);
            setTimeZone(data);
            setWeatherIcon(data);
            console.log(data);
        }
        else
            console.error('input field is empty!');
    })
})




function setWeatherInfo(data){
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const feelsLike = document.getElementById('feels-like');
    const pressure = document.getElementById('pressure');
    const windSpeed = document.getElementById('wind-speed');
    const windDegree = document.getElementById('wind-degree')
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + '°';
    minTemp.innerHTML = Math.round(data.main.temp_min) +  '°';
    maxTemp.innerHTML = Math.round(data.main.temp_max) +  '°';
    description.innerHTML = data.weather[0].description; 
    humidity.innerHTML = 'Humidity:  ' + data.main.humidity + ' %';
    feelsLike.innerHTML = 'Feels like:  ' + Math.round(data.main.feels_like) + '°';
    pressure.innerHTML = 'Pressure:  ' + (data.main.pressure) + ' mbar';
    windSpeed.innerHTML = 'Wind speed:  ' + ((data.wind.speed) * 3.6).toFixed(2) + ' Km/h';
    windDegree.innerHTML = 'Wind direction:  ' + getWindDirection(data.wind.deg) + ' (' + data.wind.deg + '°' + ')';
    
}



function setWeatherIcon(data){
    const icon = data.weather[0].icon;
    const img = document.getElementById('icon');
    const img_src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    img.src = img_src;
    img.style.display = 'block';
}




function formatTwoDigits(time){
    if(time <= 9){
        return '0' + time; 
    }
    return time;
}



function setTimeZone(data){
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    let sunriseTime = data.sys.sunrise;
    let sunsetTime = data.sys.sunset;
    const timezoneOffset = data.timezone;
    sunriseTime += timezoneOffset;
    sunsetTime += timezoneOffset;
    sunriseTime = new Date(sunriseTime * 1000);
    sunsetTime = new Date(sunsetTime * 1000);
    const sunriseHour = sunriseTime.getUTCHours();
    const sunriseMinutes = sunriseTime.getUTCMinutes();
    const sunsetHour = sunsetTime.getUTCHours();
    const sunsetMinutes = sunsetTime.getUTCMinutes();
    sunrise.innerHTML = 'Sunrise: ' + `${formatTwoDigits(sunriseHour)}:${formatTwoDigits(sunriseMinutes)}`;
    sunset.innerHTML = 'Sunset: ' + `${formatTwoDigits(sunsetHour)}:${formatTwoDigits(sunsetMinutes)}`;
}




function getWindDirection(degree){
    const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
    const index = Math.round((degree / 45) % 8);
    return directions[index];
}