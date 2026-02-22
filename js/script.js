const apiKey="37909e5f44af01738c5a2c769c1fe735"
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    var data = await response.json();

    console.log(data)

    document.querySelector(".city").innerHTML = data.name; 
    document.querySelector(".temp").innerHTML = data.main.temp + "°C"; 
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%"; 
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr"; 
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value)
})

searchBtn.addEventListener('enter', ()=>{
    checkWeather(searchBox.value)
})
