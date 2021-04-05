var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city");
var weatherBox = document.querySelector("#weather-container");
var fiveR = document.querySelector("#fiveR");
var currentDate = moment().format("l");
var searchHistory = localStorage.getItem("pastCities");


var formSubmit = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    
    if (city){
        localStorage.setItem("pastCities",JSON.stringify(city.value));
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
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=c8f225cee6b1a2085c93026298f7c5a4&cnt=5&units=imperial';

    fetch(apiUrl)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayFiveDay(data,city);
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
    otherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&' + 'lon=' + lon + '&appid=c8f225cee6b1a2085c93026298f7c5a4&units=imperial';
    
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
    colorBox = document.createElement('h1');

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
var displayFiveDay = function(data,city){
    cardOne = document.createElement('div');
    cardTwo = document.createElement('div');
    cardThree = document.createElement('div');
    cardFour = document.createElement('div');
    cardFive = document.createElement('div');
    picOne = document.createElement('img');
    picTwo = document.createElement('img');
    picThree = document.createElement('img');
    picFour = document.createElement('img');
    picFive = document.createElement('img');
    tempOne = document.createElement('p');
    tempTwo = document.createElement('p');
    tempThree = document.createElement('p');
    tempFour = document.createElement('p');
    tempFive = document.createElement('p');
    humidOne = document.createElement('p');
    humidTwo = document.createElement('p');
    humidThree = document.createElement('p');
    humidFour = document.createElement('p');
    humidFive = document.createElement('p');
    cardOne.setAttribute("class","col card bluey");
    cardTwo.setAttribute("class","col card bluey");
    cardThree.setAttribute("class","col card bluey");
    cardFour.setAttribute("class","col card bluey");
    cardFive.setAttribute("class","col card bluey");

    picOne.src = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
    picTwo.src = 'http://openweathermap.org/img/w/' + data.list[1].weather[0].icon + '.png';
    picThree.src = 'http://openweathermap.org/img/w/' + data.list[2].weather[0].icon + '.png';
    picFour.src = 'http://openweathermap.org/img/w/' + data.list[3].weather[0].icon + '.png';
    picFive.src = 'http://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png';
    tempOne.innerHTML = "Temp: " + data.list[0].main.temp + ' F°';
    tempTwo.innerHTML = "Temp: " + data.list[1].main.temp + ' F°';
    tempThree.innerHTML = "Temp: " + data.list[2].main.temp + ' F°';
    tempFour.innerHTML = "Temp: " + data.list[3].main.temp + ' F°';
    tempFive.innerHTML = "Temp: " + data.list[4].main.temp + ' F°';
    humidOne.innerHTML = "Humidity: " + data.list[0].main.humidity + " %";
    humidTwo.innerHTML = "Humidity: " + data.list[1].main.humidity + " %";
    humidThree.innerHTML = "Humidity: " + data.list[2].main.humidity + " %";
    humidFour.innerHTML = "Humidity: " + data.list[3].main.humidity + " %";
    humidFive.innerHTML = "Humidity: " + data.list[4].main.humidity + " %";
    fiveR.appendChild(cardOne);
    cardOne.append(picOne);
    cardOne.appendChild(tempOne);
    tempOne.appendChild(humidOne);
    fiveR.append(cardTwo);
    cardTwo.append(picTwo);
    cardTwo.appendChild(tempTwo);
    tempTwo.appendChild(humidTwo);
    fiveR.append(cardThree);
    cardThree.append(picThree);
    cardThree.appendChild(tempThree);
    tempThree.appendChild(humidThree);
    fiveR.append(cardFour);
    cardFour.append(picFour);
    cardFour.appendChild(tempFour);
    tempFour.appendChild(humidFour);
    fiveR.append(cardFive);
    cardFive.append(picFive);
    cardFive.appendChild(tempFive);
    tempFive.appendChild(humidFive);
    
    }

cityForm.addEventListener('submit',formSubmit);