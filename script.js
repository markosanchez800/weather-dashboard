var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city");
var weatherBox = document.querySelector("#weather-container");
var currentDate = moment().format("l");


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
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c8f225cee6b1a2085c93026298f7c5a4&units=imperial';

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

var displayFiveDay = function(data,city){
    var dayOne = $()
}

var displayWeather = function(data,city){
    var weatherList = document.createElement('a');
    var showName = document.createElement('h1');
    var typePic = document.createElement('img');
    var tempy = document.createElement('h1');
    var humidity = document.createElement('h1');
    windy = document.createElement('h1');
    showName.innerHTML = data.name + ' ';
    typePic.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    tempy.innerHTML = 'Temperature: ' + data.main.temp + ' F°';
    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';
    windy.innerHTML = 'Wind Speed: ' + data.wind.speed + ' mph';
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    console.log(showName);
    console.log(tempy);
    console.log(humidity);
    console.log(windy);

    weatherList.classList = 'list-item flex-row justify-space-between align-center';
    weatherList.appendChild(showName);
    showName.append(currentDate);
    showName.append(typePic);
    showName.appendChild(tempy);
    tempy.appendChild(humidity);
    humidity.appendChild(windy);
    weatherBox.appendChild(weatherList);
    getUV(lat,lon);
    
}

var getUV = function(lat,lon){
    otherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&' + 'lon=' + lon + '&appid=c8f225cee6b1a2085c93026298f7c5a4';
    
    fetch(otherUrl)
    .then(function(response){
        if (response.ok){
            response.json().then(function(datas){
                displayUV(datas);
            });
        } else { 
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error){
        alert('Unable to connect to OpenWeather');
    });
   
};

var displayUV = function(datas){
    uVee = datas.current.uvi;
    var colorBox = document.createElement('h1');

    if (uVee <= 2){
      colorBox.setAttribute("class"," rounded-pill bg-success");
    } else if (uVee > 2 && uVee <= 5){
      colorBox.setAttribute("class"," rounded-pill bg-warning");
    } else if (uVee == 6 || uVee == 7){
      colorBox.setAttribute("class"," rounded-pill orange");  
    } else if (uVee > 7 && uVee < 11){
      colorBox.setAttribute("class","rounded-pill bg-danger");    
    } else if (uVee > 10){
      colorBox.setAttribute("class"," rounded-pill purp"); 
    }
    colorBox.innerHTML = uVee;
    windy.append(colorBox);
}


cityForm.addEventListener('submit',formSubmit);