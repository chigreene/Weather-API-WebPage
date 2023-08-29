var APIKey = '3b136a65d0153eeff26cb38c4e78b611'
var root = document.querySelector("#todayWeather")
var fiveDayContainer = document.querySelector('#fiveDayForecast')

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

function apiCall(city, state, country){
    todayWeather.textContent = ""
    
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    console.log(`queryURL: ${queryURL}`)

    // var geoCodingURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',' + country + '&appid=' + APIKey;

    

    fetch(queryURL)
        .then(function (response){   
            return response.json();
            
            
        })
        .then(function (data){
            // is this the best place for this?
            $('#dateRoot').text(today.format('MMM D, YYYY'));
            console.log(data)
            var temp = document.createElement('p');
            var wind = document.createElement('p');
            var humidity = document.createElement('p');

            root.append(temp)
            root.append(wind)
            root.append(humidity)

            temp.innerHTML = 'Temp: ' + Math.floor((data.main.temp - 273.15) * 1.8 + 32) + ' degrees Fahrenheit';

            wind.innerHTML = 'Wind: ' + data.wind.speed + 'mph';

            humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%'

            var lat = data.coord.lat
            var lon = data.coord.lon

            console.log(lat)
            console.log(lon)
            
            var fiveDayForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
            
            fetch(fiveDayForecastURL)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    for( let i=0; i<5; i++){ 
                        var forecastDiv = document.createElement('div')
                        var date = document.createElement('h3')
                        var fiveDaysTemp = document. createElement('p')
                        var fiveDaysWind = document. createElement('p')
                        var fiveDaysHumidity = document. createElement('p')

                        var today1 = dayjs()
                        var tomorrow = today1.add(i, 'day');
                        var formattedDate = tomorrow.format('MMM D, YYYY')
                        date.append(formattedDate)

                        forecastDiv.className = 'oneOfFiveContainer';
                        
                        fiveDaysTemp.textContent = 'Temp: ' + Math.floor((data.list[i].main.temp -273.15) * 1.8 + 32)
                        fiveDaysWind.textContent = 'Wind: ' + data.list[i].wind.speed
                        fiveDaysHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity

                        fiveDayContainer.append(forecastDiv)
                        forecastDiv.append(date)
                        forecastDiv.append(fiveDaysTemp)
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
    
    var state = stateInput.value
    var country = countryInput.value
    var city = cityInput.value;
    if (cityInput.value === '') return;
    console.log(city)
    performSearch(city);
    apiCall(city, state, country)
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