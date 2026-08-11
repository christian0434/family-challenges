// Weather Dashboard - Using OpenWeatherMap Free API

// API Configuration
const API_KEY = '8bdf4bb3cbc50eb47dfff61087964066'; // Free tier key from OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Global Variables
let currentWeatherData = null;
let forecastData = null;
let searchHistory = [];
let tempUnit = 'C'; // Default Celsius

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadSearchHistory();
    getWeatherByCoordinates(); // Try to get user's location
});

// Get Weather by City Name
async function searchCity() {
    const city = document.getElementById('searchInput').value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading(true);
    hideError();

    try {
        // Get coordinates from city name
        const geoResponse = await fetch(
            `${BASE_URL}/find?q=${city}&type=like&sort=population&cnt=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.list || geoData.list.length === 0) {
            showError('City not found. Please try another name.');
            showLoading(false);
            return;
        }

        const { coord, name, sys } = geoData.list[0];
        getWeatherByCoordinates(coord.lat, coord.lon, name);
        addToSearchHistory(name);
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to search city. Please try again.');
        showLoading(false);
    }
}

// Get Weather by Coordinates
async function getWeatherByCoordinates(lat = null, lon = null, cityName = null) {
    showLoading(true);
    hideError();

    try {
        let url;

        if (lat && lon) {
            // Use provided coordinates
            url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        } else {
            // Try to get user's location
            if ('geolocation' in navigator) {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
                            await fetchAndDisplayWeather(url);
                            resolve();
                        },
                        (error) => {
                            console.log('Geolocation error:', error);
                            // Fallback to default city
                            url = `${BASE_URL}/weather?q=London&units=metric&appid=${API_KEY}`;
                            fetchAndDisplayWeather(url);
                            resolve();
                        }
                    );
                });
            } else {
                // No geolocation support, use default city
                url = `${BASE_URL}/weather?q=London&units=metric&appid=${API_KEY}`;
            }
        }

        if (url) {
            await fetchAndDisplayWeather(url);
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load weather data. Please try again.');
        showLoading(false);
    }
}

// Fetch and Display Weather
async function fetchAndDisplayWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not available');

        const data = await response.json();
        currentWeatherData = data;

        // Get forecast data
        const forecastUrl = `${BASE_URL}/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastJSON = await forecastResponse.json();
        forecastData = forecastJSON;

        displayWeather();
        displayForecast();
        showLoading(false);
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load weather data.');
        showLoading(false);
    }
}

// Display Current Weather
function displayWeather() {
    if (!currentWeatherData) return;

    const data = currentWeatherData;
    const weather = data.weather[0];
    const main = data.main;
    const wind = data.wind;
    const sys = data.sys;
    const clouds = data.clouds;

    // Update city and time
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('updateTime').textContent = new Date().toLocaleString();

    // Update weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    // Update temperature
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('description').textContent = weather.main;
    document.getElementById('feelsLike').textContent = `Feels like: ${Math.round(main.feels_like)}°C`;

    // Update details
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('maxTemp').textContent = `${Math.round(main.temp_max)}°C`;
    document.getElementById('minTemp').textContent = `${Math.round(main.temp_min)}°C`;

    // Update additional info
    document.getElementById('uvIndex').textContent = 'N/A'; // Requires paid tier
    document.getElementById('sunrise').textContent = formatTime(sys.sunrise);
    document.getElementById('sunset').textContent = formatTime(sys.sunset);
    document.getElementById('precipitation').textContent = `${data.rain?.['1h'] || 0} mm`;

    // Show main content
    document.getElementById('mainContent').style.display = 'block';
}

// Display Forecast
function displayForecast() {
    if (!forecastData) return;

    const container = document.getElementById('forecastContainer');
    const forecasts = {};

    // Group forecasts by day
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString();

        if (!forecasts[dateStr]) {
            forecasts[dateStr] = {
                day,
                temps: [],
                weather: item.weather[0],
                description: item.weather[0].main
            };
        }
        forecasts[dateStr].temps.push(item.main.temp);
    });

    // Display first 5 days
    container.innerHTML = Object.entries(forecasts)
        .slice(0, 5)
        .map(([dateStr, forecast]) => {
            const avgTemp = Math.round(
                forecast.temps.reduce((a, b) => a + b, 0) / forecast.temps.length
            );
            const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`;

            return `
                <div class="forecast-card">
                    <div class="day">${forecast.day}</div>
                    <img src="${iconUrl}" alt="${forecast.description}" style="width: 50px; height: 50px;">
                    <div class="temp">${avgTemp}°C</div>
                    <div class="description">${forecast.description}</div>
                </div>
            `;
        })
        .join('');
}

// Format Unix timestamp to time
function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get Current Location
function getCurrentLocation() {
    showLoading(true);
    hideError();

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                showError('Unable to get your location. Please search manually.');
                showLoading(false);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
        showLoading(false);
    }
}

// Refresh Weather
function refreshWeather() {
    if (currentWeatherData) {
        const { lat, lon } = currentWeatherData.coord;
        getWeatherByCoordinates(lat, lon);
    } else {
        getWeatherByCoordinates();
    }
}

// Handle Enter Key Press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchCity();
    }
}

// Add to Search History
function addToSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.unshift(city);
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }
        saveSearchHistory();
        updateSearchHistory();
    }
}

// Update Search History Display
function updateSearchHistory() {
    const historyDiv = document.getElementById('searchHistory');
    if (searchHistory.length === 0) {
        historyDiv.innerHTML = '<p style="text-align: center; color: #999;">No search history yet</p>';
        return;
    }

    historyDiv.innerHTML = searchHistory
        .map(city => `
            <button onclick="searchCityFromHistory('${city}')">
                🔍 ${city}
            </button>
        `)
        .join('');
}

// Search City from History
function searchCityFromHistory(city) {
    document.getElementById('searchInput').value = city;
    searchCity();
}

// Save/Load from LocalStorage
function saveSearchHistory() {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
}

function loadSearchHistory() {
    const saved = localStorage.getItem('weatherSearchHistory');
    if (saved) {
        searchHistory = JSON.parse(saved);
        updateSearchHistory();
    }
}

// Show Loading
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    const content = document.getElementById('mainContent');
    if (show) {
        spinner.style.display = 'block';
        content.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        content.style.display = 'block';
    }
}

// Show Error
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'flex';
}

// Hide Error
function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

// Load initial weather
window.addEventListener('load', function() {
    // Weather will auto-load from coordinates if available
});