const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-box img");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".location-not-found");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        error404.style.display = "block";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".weather-box .temperature").innerHTML = Math.round(data.main.temp) + "<span>°C</span>";
        document.querySelector(".weather-box .description").innerHTML = data.weather[0].description;
        document.querySelector(".weather-details .humidity span").innerHTML = data.main.humidity + "%";
        document.querySelector(".weather-details .wind span").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Mist":
            case "Haze":
            case "Fog":
                weatherIcon.src = "images/mist.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            default:
                weatherIcon.src = "images/clear.png";
        }

        error404.style.display = "none";
        weatherBox.style.display = "";
        weatherDetails.style.display = "";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Check weather for default city on page load
checkWeather("London");