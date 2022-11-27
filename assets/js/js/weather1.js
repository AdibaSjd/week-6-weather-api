//added event listener to search button 
// search button
var Locateduser = document.querySelector('#location');
var searchButton = document.querySelector('#search');

searchButton.addEventListener('click', getLocation);

var getLocation = function() {
    if (userLocation === ' ') {
    setLocationError("Enter a location");
    }else{ findlocation (userLocation);
} i
}



//api search location
const searchlocation = function(search) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=dce906a6d5620fa7b5e261e8bf5ff913`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 
        const Locateduser = data[0];

        //addRecentLocation(location);

        displayCurrentWeather(location);
    })
}




//current weather displayed 
const displayCurrentWeather = function(data) {
    const currentWeather = data.current;

    document.querySelector('#temp_value').textContent = `${currentWeather.temp}`;
    document.querySelector('#wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.quwryselector('#humid_value').textContent = `${currentWeather.humididity}%`;
 };



 const getWeather = function(lat, lon) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=dce906a6d5620fa7b5e261e8bf5ff91`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 

        displayCurrentWeather(data);
        displayWeatherForecast(data);
    })
  }

  //display weather on screen 
    const displayWeather = (weatherData) => {
        document.gqueryselector("#yourLocation").textContent = `${weatherData.name}, ${weatherData.country}`;

        getWeather(weatherData.lat, weatherData.lon);
    }


//days of weather 
function weatherdays () {
    var Days = moment().isoWeekday()
}




