const apiKey = '028c03d45e069148e45a04ffd902d490';

async function currentWeatherData(city){
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(currentWeatherUrl);
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        return await response.json();
    }catch(error){
        console.error('Error fetching current weather data', error);
    }
}


async function forecastWeatherData(city){
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    try{
        const response = await fetch(forecastWeatherUrl);
        if(!response.ok){
            throw new Error('Somthing went wrong');
        }
        return await response.json();
    }catch(error){
        console.error('Error fetching forecast weather data', error);
    }
}


function getWindDirection(degree){
    const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
    le index = Math.round((degree / 45) % 8);
    if(index === 8)
        index = 0;
    console.log(index);
    return directions[index];
}


function setCurrentInfo(currentData){
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const feelsLike = document.getElementById('feels-like');
    const pressure = document.getElementById('pressure');
    const windSpeed = document.getElementById('wind-speed');
    const windDegree = document.getElementById('wind-degree');
    cityName.innerHTML = currentData.name;
    temp.innerHTML = Math.round(currentData.main.temp) + '°';
    minTemp.innerHTML = Math.round(currentData.main.temp_min) +  '°';
    maxTemp.innerHTML = Math.round(currentData.main.temp_max) +  '°';
    description.innerHTML = currentData.weather[0].description; 
    humidity.innerHTML = 'Humidity:  ' + currentData.main.humidity + ' %';
    feelsLike.innerHTML = 'Feels like:  ' + Math.round(currentData.main.feels_like) + '°';
    pressure.innerHTML = 'Pressure:  ' + (currentData.main.pressure) + ' mbar';
    windSpeed.innerHTML = 'Wind speed:  ' + ((currentData.wind.speed) * 3.6).toFixed(2) + ' Km/h';
    windDegree.innerHTML = 'Wind direction:  ' + getWindDirection(currentData.wind.deg) + ' (' + currentData.wind.deg + '°' + ')';
}


function setWeatherIcon(currentData){
    const icon = currentData.weather[0].icon;
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


function setTimeZone(currentData){
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    let sunriseTime = currentData.sys.sunrise;
    let sunsetTime = currentData.sys.sunset;
    const timezoneOffset = currentData.timezone;
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





function formatForecastData(forecastData){
    let days = [[], [], [], [], [], []];
    let currday = new Date(forecastData.list[0].dt * 1000);
    let index = 0; 
    for(i = 1; i < forecastData.list.length; i++){
        let date = new Date(forecastData.list[i].dt * 1000);
        if(date.getUTCDate() === currday.getUTCDate()){
            days[index].push(forecastData.list[i]);
        }else{
            index++;
            days[index].push(forecastData.list[i]);
            currday = date;
        }
    }




    for(i = 0; i < 6; i++){
        console.log('day', i + 1 , ': ');
        for(j = 0; j < days[i].length; j++){
            console.log(new Date(days[i][j].dt * 1000).getUTCDate(), days[i][j].dt_txt);
        }
    }
}





function setForecastInfo(){
    const day1 = getElementById('day1');
    const day2 = getElementById('day2');
    const day3 = getElementById('day3');
    const day4 = getElementById('day4');
    const day5 = getElementById('day5');
    const day6 = getElementById('day6');


}



document.addEventListener('DOMContentLoaded', () =>{
    const btn = document.getElementById('sub-btn');
    btn.addEventListener('click', async () =>{
        city = document.getElementById('input-box').value;
        if(city){
            const currentData = await currentWeatherData(city);
            const forecastData = await forecastWeatherData(city);
            setCurrentInfo(currentData);
            setTimeZone(currentData);
            setWeatherIcon(currentData);
            console.log(currentData);
            console.log(forecastData);
        }
        else{
            console.error('input field is empty!');
        }
    });
});
    
    
