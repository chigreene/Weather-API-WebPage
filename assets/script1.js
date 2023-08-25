var APIKey = '3b136a65d0153eeff26cb38c4e78b611'
var city = 'Hartford';


var root = document.getElementById('todaysWeather')
var forecastSection = document.getElementById('forecastSection')

// button
var btn = document.querySelector('#selectCityBtn')
var cityInput = document.querySelector('#citySelector')
var stateInput = document.querySelector('#stateSelector')
var countryInput = document.querySelector('#countrySelector')
var bsDiv1 = document.querySelector('.fiveDayCard1')
var bsDiv2 = document.querySelector('.fiveDayCard2')
var bsDiv3 = document.querySelector('.fiveDayCard3')
var bsDiv4 = document.querySelector('.fiveDayCard4')
var bsDiv5 = document.querySelector('.fiveDayCard5')

var cityName = document.createElement('h2')
var todaysDate = document.createElement('h2')
var temp = document.createElement('p')
var wind = document.createElement('p')
var humidity = document.createElement('p')

var today = dayjs();
$('#1a').text(today.format('MMM D, YYYY'));

root.append(cityName)
root.append(todaysDate)
root.append(temp)
root.append(wind)
root.append(humidity)

btn.addEventListener("click", function(){
    var selectedCity = cityInput.value
    var selectedState = stateInput.value
    var selectedCountry = countryInput.value
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + selectedCity + '&appid=' + APIKey;
    var geoCodingURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + selectedCity + ',' + selectedState + ',' + selectedCountry + '&appid=' + APIKey;
    
    var bs5Day1 = $('.fiveDayCard1');
    bs5Day1.css('display', 'inline-block')

// fetch query
    fetch(queryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            // console.log(data.name)
            cityName.innerHTML = selectedCity;
            $(todaysDate).text(today.format('MMM D, YYYY'));
            temp.innerHTML = 'Temp: ' + Math.floor((data.main.temp - 273.15) * 1.8 + 32) + ' degrees Kelvin';
            wind.innerHTML = 'Wind: ' + data.wind.speed + 'mph';
            humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%'            
        });
    fetch(geoCodingURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var lat = data[0].lat;
            var lon = data[0].lon;

            var fiveDayForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
            
            fetch(fiveDayForecastURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data)
                    
                    var bsDivs = [bsDiv1, bsDiv2, bsDiv3, bsDiv4, bsDiv5]

                    for( let i=0; i<5; i++){   
                                    
                        var forecastDiv = document.createElement('div')
                        var date = document.createElement('h3')
                        var daysTemp = document. createElement('p')
                        var daysWind = document. createElement('p')
                        var daysHumidity = document. createElement('p')

                        var today1 = dayjs()
                        var tomorrow = today1.add(i, 'day');
                        var formattedDate = tomorrow.format('MMM D, YYYY')
                        date.append(formattedDate)

                        
                        daysTemp.textContent = 'Temp: ' + data.list[i].main.temp
                        daysWind.textContent = 'Wind: ' + data.list[i].wind.speed
                        daysHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity

                        
                        $(bsDivs[i]).append(forecastDiv)
                        forecastDiv.append(date)
                        forecastDiv.append(daysTemp)
                        forecastDiv.append(daysWind)
                        forecastDiv.append(daysHumidity)
                    }
                    


                    

                })
        })
    
    // bs5DayCard.setAttribute("style", "display: inline-block");
})

// lat lon geocoding API

// parent container and create a new div each time i go through the loop make sure to erase div before creating new one 

