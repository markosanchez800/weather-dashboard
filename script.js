var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city");


var formSubmit = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if (city){
        getCityWeather(city);
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

var displayWeather = function(data,city){
    var showName = document.createElement('h1');
    var tempy = document.createElement('h2');
    var humidity = document.createElement('h2');
    var windy = document.createElement('h2');
    //var uvIndo = document.createElement('h2');
    showName = data.name;
    tempy = (data.main.temp-273.15)*9/5+32;
    humidity = data.main.humidity;
    windy = data.wind.speed;
    //uvIndo = data.
    console.log(showName);
    console.log(tempy);
    console.log(humidity);
    console.log(windy);
}


cityForm.addEventListener('submit',formSubmit);