let cityRef = document.getElementById("city");
let searchBtn = document.getElementById("search-btn");
let temprature = document.getElementById("temp");
let cityName = document.getElementById("city-name");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind");
let weatherIcon = document.querySelector(".weather-icon")
let main = document.getElementById("main");
let description = document.getElementById("description");

const apiKey = "3b74d44f87e546df8200679f114a5448";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    cityName.innerHTML = data.name;
    temprature.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + " km/h";
    main.innerHTML = data.weather[0].main;
    description.innerHTML = data.weather[0].description;

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
}

searchBtn.addEventListener("click", () =>{
    checkWeather(cityRef.value);
})
