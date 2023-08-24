var APIKey = '3b136a65d0153eeff26cb38c4e78b611'
var city = 'Hartford';
var state;
var country;

var root = document.getElementById('todaysWeather')

// button
var btn = document.querySelector('#selectCityBtn')
var cityInput = document.querySelector('#citySelector')

btn.addEventListener("click", function(){
    var selectedCity = cityInput.value
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + selectedCity + '&appid=' + APIKey;

// fetch query
    fetch(queryURL)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            console.log(data)
            
            var temp = document.createElement('p')
            var wind = document.createElement('p')
            var humidity = document.createElement('p')
            
            temp.textContent = 'Temp: ' + Math.floor((data.main.temp - 273.15) * 1.8 + 32) + ' degrees Kelvin';
            wind.textContent = 'Wind: ' + data.wind.speed + 'mph';
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%'

            root.append(temp)
            root.append(wind)
            root.append(humidity)
        });
})