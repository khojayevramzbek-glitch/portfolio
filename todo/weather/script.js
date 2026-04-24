const apiKey = "7d71987d09ea1a161c603e7b668158d5";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    result.innerHTML = "Loading...";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            result.innerHTML = "City not found";
            return;
        }

        const data = await response.json();

        result.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {
        result.innerHTML = "Error fetching weather data";
    }
}