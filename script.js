var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city");
var weatherBox = document.querySelector("#weather-container");


var formSubmit = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city){
        getCityWeather(city);
        getFiveDay(city);
    }
}




// Read up on modems and replace alerts!!!!!
var getCityWeather = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c8f225cee6b1a2085c93026298f7c5a4';

    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayWeather(data,city);
                console.log(data,city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error){
        alert('Unable to connect to OpenWeather');
    });
};

var getFiveDay = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=c8f225cee6b1a2085c93026298f7c5a4&cnt=5';

    fetch(apiUrl)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
                //displayFiveDay(data,city);
                console.log(data,city);
            });
        } else { 
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error){
        alert('Unable to connect to OpenWeather');
    });
};

var displayWeather = function(data,city){
    var weatherList = document.createElement('a');
    var showName = document.createElement('h1');
    var typePic = document.createElement('img');
    var tempy = document.createElement('h1');
    var humidity = document.createElement('h1');
    var windy = document.createElement('h1');
    //var uvIndo = document.createElement('h2');
    showName.innerHTML = data.name;
    typePic.img = data.weather.icon;
    tempy.innerHTML = 'Temperature: ' + (data.main.temp-273.15)*9/5+32 + ' F°';
    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';
    windy.innerHTML = 'Wind Speed: ' + data.wind.speed + ' mph';
    //uvIndo = data.
    console.log(showName);
    console.log(tempy);
    console.log(humidity);
    console.log(windy);

    weatherList.classList = 'list-item flex-row justify-space-between align-center';
    weatherList.appendChild(showName);
    showName.append(typePic);
    showName.appendChild(tempy);
    tempy.appendChild(humidity);
    humidity.appendChild(windy);
    weatherBox.appendChild(weatherList);
    
}


cityForm.addEventListener('submit',formSubmit);