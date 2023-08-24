var APIKey = '3b136a65d0153eeff26cb38c4e78b611'
var city = "Atlanta";
var state;
var country;
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

fetch(queryURL)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log(data)
    })