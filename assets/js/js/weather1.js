//added event listener to search button 
// search button
var Locateduser = document.querySelector('#location');
var searchButton = document.querySelector('#search');

searchButton.addEventListener('click', getlocation);

function getlocation() {
    // input value
    var userlocation = Locateduser.value.trim();

    // if empty throw error
    if (userlocation === '') {
        setlocationError("Enter a location");
        // setLocationError("Enter a location");
    } else {
        findlocation(userlocation);
    }
}

function setLocationError(message){
    document.queryselector("#error").textContent = message;
}


//api search location
const searchlocation = function (search) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=dce906a6d5620fa7b5e261e8bf5ff913`
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const locationData = data[0]
           // console.log(data)
            //const lat = data[0].lat;
            //const lon = data[0].lon;

            //getWeather(lat, lon);
            displayCurrentWeather(locationData);
        })
}




//current weather displayed 
const displayCurrentWeather = function (data) {
    const currentWeather = data.current;

    document.querySelector('#temp_value').textContent = `${currentWeather.temp}`;
    document.querySelector('#wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.quwryselector('#humid_value').textContent = `${currentWeather.humididity}%`;
    getWeather(currentWeather.lat, currentWeather.lon);
};



function getWeather (lat, lon) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=dce906a6d5620fa7b5e261e8bf5ff913`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCurrentWeather(data);
            displayWeatherForecast(data);
        })
}

//display weather on screen 
const displayWeather = (weatherData) => {
    document.queryselector("#yourLocation").textContent = `${weatherData.name}, ${weatherData.country}`;

    getWeather(weatherData.lat, weatherData.lon);
}


//days of weather 
function weatherdays() {
    var Days = moment().isoWeekday()
}




