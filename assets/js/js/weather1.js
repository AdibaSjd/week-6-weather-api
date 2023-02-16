//added event listener to search button 
// search button
var Locateduser = document.querySelector('#myLocation');
var searchButton = document.querySelector('#search');

searchButton.addEventListener('click', getlocation);

var recentLocations = [];

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

            // Save the location to local storage so we can re-run the search later
            saveLocation(search);

            // Display the weather for the location
            getWeather(lat, lon);
        })
}

function onClickRecentLocation (e) {
    var location = e.target.textContent;
    searchlocation(location);
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
    console.log(data);
    const currentWeather = data.current;
    document.querySelector('#temp_value').textContent = `Temp: ${currentWeather.temp}°`;
    document.querySelector('#humid_value').textContent = `Humidity: ${currentWeather.humidity}%`;
    document.querySelector('#wind_value').textContent = `Wind Speed: ${currentWeather.wind_speed}MPH`;

    // Show the fortcast for the next 5 days
    displayWeatherForecast(data.daily);
};


const displayWeatherForecast = (dailyWeather) =>{

    for (let i = 1; i < 6; i++) {
        const dayWeather = dailyWeather[i];
        displayDayWeather(dayWeather, i);
    };
}

const displayDayWeather = (weatherData, number) => {
    
     var dayName = document.getElementById("dayName" + number);
     dayName.textContent = moment().add(number, 'days').format('dddd');

     var dayTemp = document.getElementById("dayTemp" + number);
     dayTemp.textContent = weatherData.temp.day;

     var dayWind = document.getElementById("dayWind" + number);
     dayWind.textContent = weatherData.wind_speed;

     var dayHumidity = document.getElementById("dayHumidity" + number);
     dayHumidity.textContent = weatherData.humidity;
}

// display weather on screen 
const displayWeather = (weatherData) => {
    document.queryselector("#yourLocation").textContent = `${weatherData.name}, ${weatherData.country}`;
    getWeather(weatherData.lat, weatherData.lon);
}

// Save the location to local storage
function saveLocation(location){
    
    recentLocations.push(location);
    localStorage.setItem("location", JSON.stringify(recentLocations));

    loadLocations();
}

// Load in the saved locations when the page first loads
function loadLocations() {
    var savedLocations = localStorage.getItem("location");
    if(savedLocations){
        recentLocations = JSON.parse(savedLocations);

        var recentSearchesList = document.querySelector("#recentSearchesList");
        recentSearchesList.innerHTML =""
        for(var i = 0; i < recentLocations.length; i++){
            var newLocation = document.createElement("li");
            newLocation.textContent = recentLocations[i];
            newLocation.onclick = onClickRecentLocation;

            recentSearchesList.appendChild(newLocation);
        }
    }
}

// Load in the saved locations when the page first loads
loadLocations();