const apiKey="37909e5f44af01738c5a2c769c1fe735"
const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=";

// DOM Elements
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");
const moreDetailsBtn = document.querySelector(".more-details-btn");

// Settings Elements
const toggleUnitsBtn = document.getElementById("toggle-units");
const unitsLabel = document.getElementById("units-label");
const toggleThemeBtn = document.getElementById("toggle-theme");
const themeLabel = document.getElementById("theme-label");

// State
let isCelsius = true;
let currentWeatherData = null;

// Helper to format temperature based on current unit State
function formatTemp(celsiusValue) {
    if (isCelsius) {
        return Math.round(celsiusValue);
    } else {
        return Math.round((celsiusValue * 9/5) + 32);
    }
}

// Function to handle fetching weather data
async function checkWeather(city){
    try {
        // Fetch using metric by default to store base Celsius data
        const response = await fetch(apiUrl + city +`&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            alert("City not found");
            return;
        }
        
        currentWeatherData = await response.json();
        console.log("Weather data:", currentWeatherData);

        updateUI();
        
        // Optional: clear search box after successful search
        searchBox.value = "";
        
        // Make sure we are on the weather tab after searching
        switchToTab('weather-tab');

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Separate UI update logic so we can call it when units toggle
function updateUI() {
    if (!currentWeatherData) return;
    
    const data = currentWeatherData;
    const unitSymbol = isCelsius ? "C" : "F";
    const unitSpeed = isCelsius ? "km/h" : "mph";
    
    // Wind Speed Conversion (km/h -> mph)
    let speed = data.wind.speed; // API returns meter/sec for metric
    let displaySpeed = isCelsius ? Math.round(speed * 3.6) : Math.round(speed * 2.23694);

    // Update Header location
    document.querySelector(".location-header .city").innerHTML = data.name; 
    
    // Update Main Temperature
    document.querySelector(".current-weather .temp").innerHTML = `${formatTemp(data.main.temp)}<span class="degree-symbol">°</span><span class="unit">${unitSymbol}</span>`; 
    
    // Update Current Weather Description
    const weatherDesc = data.weather[0].main;
    document.querySelector(".weather-description").innerHTML = weatherDesc;
    
    // Update High/Low
    document.querySelector(".high-low").innerHTML = `<span>H: ${formatTemp(data.main.temp_max)}°${unitSymbol}</span> <span>L: ${formatTemp(data.main.temp_min)}°${unitSymbol}</span>`;

    // Update Details Grid
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%"; 
    document.querySelector(".wind").innerHTML = `${displaySpeed} <span class="unit-text">${unitSpeed}</span>`; 
}

// -----------------------------------------------------
// Search Functionality
// -----------------------------------------------------
searchBtn.addEventListener('click', () => {
    if(searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        searchBox.focus(); // Just focus if empty
    }
});

searchBox.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        if(searchBox.value.trim() !== "") {
            checkWeather(searchBox.value);
        }
    }
});

// -----------------------------------------------------
// Tab Navigation Functionality
// -----------------------------------------------------
function switchToTab(targetTabId) {
    navItems.forEach(nav => nav.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));
    
    const activeNav = document.querySelector(`.nav-item[data-tab="${targetTabId}"]`);
    if(activeNav) activeNav.classList.add("active");
    
    const activeTab = document.getElementById(targetTabId);
    if(activeTab) activeTab.classList.add("active");
}

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const targetTabId = item.getAttribute("data-tab");
        switchToTab(targetTabId);
    });
});

// -----------------------------------------------------
// Settings Interactivity
// -----------------------------------------------------

// Toggle Units
toggleUnitsBtn.addEventListener("click", () => {
    isCelsius = !isCelsius;
    unitsLabel.textContent = isCelsius ? "Celsius (°C)" : "Fahrenheit (°F)";
    // Re-render UI with new math formula
    updateUI(); 
});

// Toggle Theme
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    
    if (document.body.classList.contains("light-theme")) {
        themeLabel.textContent = "Light Theme";
    } else {
        themeLabel.textContent = "Dark Theme";
    }
});

// -----------------------------------------------------
// Smooth Scroll for "More Details"
// -----------------------------------------------------
if (moreDetailsBtn) {
    moreDetailsBtn.addEventListener("click", () => {
        const detailsGrid = document.querySelector(".details-grid");
        if (detailsGrid) {
            detailsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Default city on load
checkWeather("New Delhi");
