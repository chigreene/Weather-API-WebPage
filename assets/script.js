var APIKey = '3b136a65d0153eeff26cb38c4e78b611'
var city = "Atlanta";
var state;
var country;
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

var root = document.getElementById('todaysWeather');

fetch(queryURL)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log(data)
        
        var temp = document.createElement('p')
        var wind = document.createElement('p')
        var humidity = document.createElement('p')
        
        temp.textContent = 'Temp: ' + data.main.temp + ' degrees Kelvin';
        wind.textContent = 'Wind: ' + data.wind.speed + 'mph';
        humidity.textContent = 'Humidity: ' + data.main.humidity + '%'

        root.append(temp)
        root.append(wind)
        root.append(humidity)
    })