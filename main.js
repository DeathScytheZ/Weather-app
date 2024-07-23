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
            setWeatherIcon(data);
            console.log(data);

        }
        else
            console.error('input field is empty!');
    })
})




function setWeatherInfo(data){
    const info_container = document.getElementsByClassName('info-container')[0];
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const min_temp = document.getElementById('min-temp');
    const max_temp = document.getElementById('max-temp');
    info_container.style.display = 'flex';
    cityName.innerHTML = data.name;
    temp.innerHTML = 'Temperature: ' + data.main.temp +  '°';
    description.innerHTML = data.weather[0].description; 
    humidity.innerHTML = 'Humidity: ' + data.main.humidity + ' %';
    // sunrise.innerHTML = 'Sunrise: ' + data.sys.sunrise;
    // sunset.innerHTML = 'Sunset: ' + data.sys.sunset;
    sunrise.innerHTML = new Date(data.sys.sunrise * 1000);
    sunset.innerHTML = new Date(data.sys.sunset * 1000);
    min_temp.innerHTML = 'Minimum Temperature: ' + data.main.temp_min +  '°';
    max_temp.innerHTML = 'Maximum Temperature: ' + data.main.temp_max +  '°';
}



function setWeatherIcon(data){
    const icon = data.weather[0].icon;
    const img = document.getElementById('test-img');
    const img_src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    img.src = img_src;
    img.style.display = 'block';
}



function setTimeZone(){

}