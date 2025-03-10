function updateTime() {
    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toDateString();
}
setInterval(updateTime, 1000);

function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current_weather.temperature;
            const windSpeed = data.current_weather.windspeed;
            const weatherCode = data.current_weather.weathercode;

            let iconUrl = "https://cdn-icons-png.flaticon.com/128/869/869869.png";

            if (weatherCode >= 0 && weatherCode < 3) {
                iconUrl = "https://cdn-icons-png.flaticon.com/128/869/869869.png";
            } else if (weatherCode >= 3 && weatherCode < 50) {
                iconUrl = "https://cdn-icons-png.flaticon.com/128/1163/1163657.png";
            } else {
                iconUrl = "https://cdn-icons-png.flaticon.com/128/1779/1779809.png";
            }

            document.getElementById("weather-icon").src = iconUrl;
            document.getElementById("weather-text").innerText = `Temp: ${temperature}°C | Wind: ${windSpeed} km/h`;
        })
        .catch(() => {
            document.getElementById("weather-text").innerText = "Weather data unavailable";
        });
}

function getLocationAndFetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            () => {
                document.getElementById("weather-text").innerText = "Location access denied";
            }
        );
    } else {
        document.getElementById("weather-text").innerText = "Geolocation not supported";
    }
}

getLocationAndFetchWeather();
setInterval(getLocationAndFetchWeather, 600000);
