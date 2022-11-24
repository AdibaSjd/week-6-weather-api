var WeatherURL = 'https://apiopenweathermap.org';
var WeatherApiKey = 'dce906a6d5620fa7b5e261e8bf5ff913';

//search button and input
var locateduser = document.getElementById('location)');
var searchButton = document.getElementById('search');

searchButton.addEventListener('click', getLocation);
//



var recentLocation = [];

var getLocation = () => {

   var userLocation = LocationInput.value; 

   if (locatedUser === '') {
    setLocationError("Enter a location");
   } else { 
    findlocation(userLocation);
  }
}

/*const RecentLocation = (location) => {
    if (!location) return;

    recentLocations.push(location);

    localStorage.setItem('recentLocation', JSON.stringify(recentLocations));

    UpdateRecentLocationList();
}

const UpdateRecentLocationList = () => {
    var recentLocationList = documnet.getElementById('recent-locations')

    recentLocationList.innerHTML=''; 

}
*/

const searchlocation = (search) => {
    const api = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=dce906a6d5620fa7b5e261e8bf5ff913`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 
        const location = data[0];

        addRecentLocation(location);

        displayWeather(location);
    })
}



 const displayCurrentWeather = (weatherData) => {
    const currentWeather = weatherData.current;

    document.getElementById('temp_value').textContent = `${currentWeather.temp}`;
    document.getElementById('wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humid_value').textContent = `${currentWeather.humididity}%`;
 }



 //forecast daily 
 const displayWeatherForecast = (weatherData) => {
    const dailyData = weatherData.daily;

    
 }


 // get weather api call top box


  const getWeather = (lat, lon) => {

    var apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=dce906a6d5620fa7b5e261e8bf5ff91`

fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 

        displayCurrentWeather(data);

        displayWeatherForecast(data);
    })
  }
    const displayWeather = (weatherData) => {
        document.getElementById('location-title').textContent = `${weatherData.name}, ${weatherData.country}`;

        getWeather(weatherData.lat, weatherData.lon);
    }






































 

