const apikey = "2571bdf3a22ef9b7ab3ca6e999f82b04";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

const imageicon = document.querySelector(".weather-icon");



async function checkweather(city) {
    
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    var data = await response.json();
    console.log(data);
    if(data.cod==404){
        alert("city name invalid");
    }

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity +" %";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        imageicon.src = "image/clouds.png";
    }
    else if(data.weather[0].main == 'Clear'){
        imageicon.src = "image/clear.png";
    }
    else if(data.weather[0].main == "Mist"){
        imageicon.src = "image/mist.png";
    }
    else if(data.weather[0].main == "Rain"){
        imageicon.src = "image/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        imageicon.src = "image/snow.png";
    }


}
// const val = searchbox.value;

searchbtn.addEventListener("click",()=>{

    checkweather(searchbox.value);

})
