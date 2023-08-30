var APIKey = '3b136a65d0153eeff26cb38c4e78b611'
var root = document.querySelector("#todayWeather")
var fiveDayContainer = document.querySelector('#fiveDayForecast')
var weatherContainer = document.querySelector('#weatherContainer')

var btn = document.querySelector('#btn');
var resetBtn = document.querySelector('#resetBtn')

var today = dayjs();

var lastResults = document.querySelector('#lastResults');
var cityInput = document.querySelector('#citySelector');
var stateInput = document.querySelector('#stateSelector');
var countryInput = document.querySelector('#countrySelector')
var array = JSON.parse(localStorage.getItem('savedCities')) || [];




function performSearch(city) {
    if (!city) return;
    if(!array.includes(city)){
        array.push(city);
        localStorage.setItem('savedCities', JSON.stringify(array));
        lastResults.innerHTML = '';
        renderHistory();
    }
}

function apiCall(city){
    todayWeather.textContent = ""
    
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    

    // var geoCodingURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',' + country + '&appid=' + APIKey;

    

    fetch(queryURL)
        .then(function (response){   
            return response.json();
            
            
        })
        .then(function (data){
            // is this the best place for this?
            $('#dateRoot').text(today.format('MMM D, YYYY'));
            
            var temp = document.createElement('p');
            var weatherIcon = document.createElement('img')
            var weather = document.createElement('p')
            var wind = document.createElement('p');
            var humidity = document.createElement('p');

            root.append(temp)
            root.append(weatherIcon)
            root.append(weather)
            root.append(wind)
            root.append(humidity)

            // icon mapping
            var icon = data.weather[0].icon
            var iconCodes = {
                '01d' : 'https://openweathermap.org/img/wn/01d@2x.png',
                '02d' : 'https://openweathermap.org/img/wn/02d@2x.png',
                '03d' : 'https://openweathermap.org/img/wn/03d@2x.png',
                '04d' : 'https://openweathermap.org/img/wn/04d@2x.png',
                '09d' : 'https://openweathermap.org/img/wn/09d@2x.png',
                '10d' : 'https://openweathermap.org/img/wn/10d@2x.png',
                '11d' : 'https://openweathermap.org/img/wn/11d@2x.png',
                '13d' : 'https://openweathermap.org/img/wn/13d@2x.png',
                '50d' : 'https://openweathermap.org/img/wn/50d@2x.png',
            }

            iconURL = iconCodes[icon]

            

            temp.innerHTML = 'Temp: ' + Math.floor((data.main.temp - 273.15) * 1.8 + 32) + ' degrees Fahrenheit';

            weatherIcon.src = iconURL

            weather.innerHTML = data.weather[0].main

            wind.innerHTML = 'Wind: ' + data.wind.speed + 'mph';

            humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%'

            var lat = data.coord.lat
            var lon = data.coord.lon

            // console.log(lat)
            // console.log(lon)
            
            var fiveDayForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
            
            fetch(fiveDayForecastURL)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    console.log(data)
                    weatherContainer.classList.remove('hidden')
                    for( let i=0; i<5; i++){ 
                        var forecastDiv = document.createElement('div')
                        var date = document.createElement('h3')
                        var fiveDaysTemp = document. createElement('p')
                        var fiveDaysWeather = document.createElement('p')
                        var fiveDaysWeatherIcon = document.createElement('img')
                        var fiveDaysWind = document. createElement('p')
                        var fiveDaysHumidity = document. createElement('p')

                        var today1 = dayjs()
                        var tomorrow = today1.add(i, 'day');
                        var formattedDate = tomorrow.format('MMM D, YYYY')
                        date.append(formattedDate)

                        forecastDiv.className = 'oneOfFiveContainer';
                        
                        fiveDaysTemp.textContent = 'Temp: ' + Math.floor((data.list[i].main.temp -273.15) * 1.8 + 32)


                        var icon = data.list[i].weather[0].icon
                        var iconCodes = {
                            '01d' : 'https://openweathermap.org/img/wn/01d@2x.png',
                            '02d' : 'https://openweathermap.org/img/wn/02d@2x.png',
                            '03d' : 'https://openweathermap.org/img/wn/03d@2x.png',
                            '04d' : 'https://openweathermap.org/img/wn/04d@2x.png',
                            '09d' : 'https://openweathermap.org/img/wn/09d@2x.png',
                            '10d' : 'https://openweathermap.org/img/wn/10d@2x.png',
                            '11d' : 'https://openweathermap.org/img/wn/11d@2x.png',
                            '13d' : 'https://openweathermap.org/img/wn/13d@2x.png',
                            '50d' : 'https://openweathermap.org/img/wn/50d@2x.png',
                        }
            
                        iconURL = iconCodes[icon]

                        fiveDaysWeatherIcon.src = iconURL

                        fiveDaysWeather.textContent = data.list[i].weather[0].main

                        fiveDaysWind.textContent = 'Wind: ' + data.list[i].wind.speed
                        fiveDaysHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity

                        fiveDayContainer.append(forecastDiv)
                        forecastDiv.append(date)
                        forecastDiv.append(fiveDaysTemp)
                        forecastDiv.append(fiveDaysWeatherIcon)
                        forecastDiv.append(fiveDaysWeather)
                        forecastDiv.append(fiveDaysWind)
                        forecastDiv.append(fiveDaysHumidity)
                    }
                })
            
        })
    // fetch(geoCodingURL)
    //     .then(function (response){
    //         return response.json()
    //     })
    //     .then(function (data){
    //         console.log(data)
    //     })
}

btn.addEventListener('click', function(event) {
    event.preventDefault();
    fiveDayContainer.textContent = ''
    
    
    var city = cityInput.value;
    if (cityInput.value === '') return;
    console.log(city)
    performSearch(city);
    apiCall(city)
});

function renderHistory() {
    var localHistoryArray = JSON.parse(localStorage.getItem('savedCities'));

    if (localHistoryArray && localHistoryArray.length > 0) {
        for (let i = 0; i < localHistoryArray.length; i++) {
            var liEl = document.createElement('p');
            var historyItemBtn = document.createElement('button');

            historyItemBtn.textContent = 'Search';
            historyItemBtn.classList.add('buttonClass');
            historyItemBtn.setAttribute('data-city', localHistoryArray[i]); // store the city in a data attribute

            liEl.classList.add('historyItemClass');
            liEl.textContent = localHistoryArray[i];
            liEl.append(historyItemBtn);

            lastResults.append(liEl);
        }    
    }
}

// Use event delegation for dynamically created elements
lastResults.addEventListener('click', function(event) {
    event.preventDefault()
    if (event.target.classList.contains('buttonClass')) {
        var associatedCity = event.target.getAttribute('data-city');
        performSearch(associatedCity);
        
    }
    fiveDayContainer.textContent = ''
    // var dataCityValue = event.target.getAttribute;
    apiCall(associatedCity);
});



renderHistory();

resetBtn.addEventListener('click', function(event){
    event.preventDefault()
    localStorage.clear()
    location.reload()
})