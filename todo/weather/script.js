const apiKey = "7d71987d09ea1a161c603e7b668158d5";

async function getWeather() {

    const city = document
        .getElementById("cityInput")
        .value.trim();

    const result =
        document.getElementById("weatherResult");

    const container =
        document.getElementById("weatherAnimation");

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

        /* RESULT CARD */

        result.innerHTML = `
            <div style="
                background:#334155;
                padding:15px;
                border-radius:10px;
                margin-top:10px;
            ">
                <h2>${data.name}</h2>
                <p>🌡 Temperature: ${data.main.temp} °C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬 Wind: ${data.wind.speed} m/s</p>
            </div>
        `;

        /* WEATHER TYPE */

        const weather =
            data.weather[0].main.toLowerCase();

        /* BACKGROUND CHANGE */

        document.body.className = "";

        if (weather.includes("clear")) {
            document.body.classList.add("clear");
        }
        else if (weather.includes("cloud")) {
            document.body.classList.add("clouds");
        }
        else if (weather.includes("rain")) {
            document.body.classList.add("rain");
        }
        else if (weather.includes("snow")) {
            document.body.classList.add("snow");
        }
        else {
            document.body.classList.add("default-weather");
        }

        /* ANIMATION */

        container.innerHTML = "";

        // RAIN
        if (weather.includes("rain")) {

            for (let i = 0; i < 100; i++) {

                const drop =
                    document.createElement("div");

                drop.className = "rain-drop";

                drop.style.left =
                    Math.random() * 100 + "vw";

                drop.style.animationDuration =
                    Math.random() * 1 + 0.5 + "s";

                container.appendChild(drop);

            }

        }

        // SNOW
        else if (weather.includes("snow")) {

            for (let i = 0; i < 50; i++) {

                const snow =
                    document.createElement("div");

                snow.className = "snowflake";
                snow.innerHTML = "❄";

                snow.style.left =
                    Math.random() * 100 + "vw";

                snow.style.animationDuration =
                    Math.random() * 3 + 2 + "s";

                container.appendChild(snow);

            }

        }

        // SUN
        else if (weather.includes("clear")) {

            const sun =
                document.createElement("div");

            sun.className = "sun";

            container.appendChild(sun);

        }

        // CLOUDS
        else if (weather.includes("cloud")) {

            for (let i = 0; i < 3; i++) {

                const cloud =
                    document.createElement("div");

                cloud.className = "cloud";

                cloud.style.top =
                    Math.random() * 150 + "px";

                cloud.style.animationDuration =
                    Math.random() * 10 + 20 + "s";

                container.appendChild(cloud);

            }

        }

    }

    catch (error) {

        result.innerHTML =
            "Error fetching weather data";

    }

}