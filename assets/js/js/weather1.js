//added event listener to search button 
// search button
var Locateduser = document.querySelector('#myLocation');
var searchButton = document.querySelector('#search');

searchButton.addEventListener('click', getlocation);

function getlocation(e) {
    e.preventDefault();

    // input value
    var userlocation = Locateduser.value.trim();
    
    // if empty throw error
    if (userlocation === '') {
        setLocationError("Enter a location");
        // setLocationError("Enter a location");
    } else {
        searchlocation (userlocation);
    }
}
function setLocationError(message) {
    document.queryselector("#error").textContent = message;
}


//api search location
const searchlocation = function (search) {

    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=d91f911bcf2c0f925fb6535547a5ddc9`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            const locationData = data[0]
            const lat = locationData.lat;
            const lon = locationData.lon;
            getWeather(lat, lon);
        })
}

function getWeather (lat, lon) {

    //const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=dce906a6d5620fa7b5e261e8bf5ff913`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
        })
}

//current weather displayed 
const displayCurrentWeather = function (data) {
    const currentWeather = data.current;
 
    document.querySelector('#temp_value').textContent = `${currentWeather.temp}`;
    document.querySelector('#humid_value').textContent = `${currentWeather.humidity}%`;
    document.querySelector('#wind_value').textContent = `${currentWeather.wind_speed}MPH`;

    // Show the fortcast for the next 5 days
    displayWeatherForecast(data.daily);
};

const displayWeatherForecast = (dailyWeather) =>{

    for (let i = 0; i < 5; i++) {
        const dayWeather = dailyWeather[i];
        displayDayWeather(dayWeather);
    };
}

const displayDayWeather = (weatherData) => {
    console.log(weatherData);

  var titleElem = document.createElement('h3');
    titleElem.textContent = weatherData.dt;
    document.querySelector('#forecast').appendChild(titleElem);
    
    return (cardHtml)
}

//display weather on screen 
const displayWeather = (weatherData) => {
    document.queryselector("#yourLocation").textContent = `${weatherData.name}, ${weatherData.country}`;

    getWeather(weatherData.lat, weatherData.lon);
}


//days of weather 
//function weatherdays() {
  //  var Days = moment().isoWeekday()
//}




