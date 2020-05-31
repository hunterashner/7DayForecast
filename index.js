const date = new Date();
//console.log(date);
const dateUnix = date.getTime();
//console.log(dateUnix);

//latitude, longitude, and api key
//41.727002, -73.240131, 8e6631d1b0023b1022deee87d15d061d 

const openWeatherURL = 'api.openweathermap.org/data/2.5/weather?zip={06750},{country code}&appid={8e6631d1b0023b1022deee87d15d061d}';

//make api request to get next 7 day forecast
async function fetchWeather () {
    const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=41.727002&lon=-73.240131&exclude=current,minutely,hourly&appid=8e6631d1b0023b1022deee87d15d061d');
    const json = await response.json();
    const weeklyForecast = json.daily;

    const dates = [];
    const temps = [];
    const rainChance = [];
    const windSpeed = [];


    const dailyWeather = [];

    // for (var i=0; i<weeklyForecast.length; i++){
    //     console.log(weeklyForecast[i].dt);
    //     console.log(weeklyForecast[i].temp.day);
    //     console.log(weeklyForecast[i].rain);
    //     console.log(weeklyForecast[i].wind_speed);
    // }
    const dateLocal = [];
    
    const div = document.getElementById('towrite');
    
    for (var i=0; i<weeklyForecast.length; i++){
        weeklyForecast[i].dt;
        dates.push(weeklyForecast[i].dt);
        temps.push(weeklyForecast[i].temp.day);
        rainChance.push(weeklyForecast[i].rain);
        windSpeed.push(weeklyForecast[i].wind_speed);
        
        //convert times from unix time to local
        let utcSeconds = dates[i];
        let d = new Date(0);
        let localTime = d.setUTCSeconds(utcSeconds);
        let stringTime = d.toString();
        
        //convert kelvins to fahrenheit
        let toFahrenheit = ((temps[i] - 273.15) * (9 / 5) + 32); 
        let finalFahrenheit = Math.floor(toFahrenheit);

        //if precipatation is undefined show as 0% chance of rain
        let floatRain = Number(rainChance[i]);
        if (isNaN(floatRain)){
            floatRain = 0;
        }

        //if high chance of rain show raincloud
        if (floatRain < 0.30){
            div.innerHTML += "<img class=\"weatherpic\" src=\"sun.png\">";
        } 
        if (floatRain > 0.50){
            div.innerHTML += "<img class=\"weatherpic\" src=\"rain.png\">";
        }




        //display weekly forecast 
        div.innerHTML += "<h3>" + stringTime.slice(0,15) + "</h3>";
        div.innerHTML += "<p>" + "Temperature: " + finalFahrenheit + "°" + "</p>";
        div.innerHTML += "<p>" + "Chance Of Rain: " + floatRain + "%" + "</p>";
        div.innerHTML += "<p>" + "Wind Speed: " + windSpeed[i] + " Miles/Hour" + "</p>";
        if (windSpeed[i] > 15){
            div.innerHTML += "<p>" + "High Wind Advisory, Bring In Patio Cushions" + "</p>";
        } 
        div.innerHTML += "<hr>";
        //console.log(dates);
    }
    

    //console.log(dates, dailyTemps, rainChance, windSpeed);
    //console.log(dailyWeather);

    //const div = document.getElementById('towrite');
    //div.innerHTML += '<h1>' + dates[0] + '</h1>';
    //div.innerHTML += '<p>' + temps[0] + '</p>';
    //div.innerHTML += '<p>' +rainChance[0] + '</p>';
    //div.innerHTML += '<p>' + windSpeed[0] + '</p>';



    
    
    //const file = JSON.stringify(weeklyForecast);
    //console.log(weeklyForecast);
    //console.log(file);
}

// grab dates from json and convert dates from unix and display on webpage











fetchWeather();