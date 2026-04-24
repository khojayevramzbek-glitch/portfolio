const apiKey = "7d71987d09ea1a161c603e7b668158d5";

async function getWeather() {

    const city =
        document
        .getElementById("cityInput")
        .value
        .trim();

    const result =
        document.getElementById(
            "weatherResult"
        );

    const container =
        document.getElementById(
            "weatherAnimation"
        );

    if (city === "") {

        result.innerHTML =
            "Please enter a city name";

        return;

    }

    result.innerHTML = "Loading...";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {

        const response =
            await fetch(url);

        if (!response.ok) {

            result.innerHTML =
                "City not found";

            return;

        }

        const data =
            await response.json();

        result.innerHTML = `

            <div style="
                background:#334155;
                padding:15px;
                border-radius:10px;
                margin-top:10px;
            ">

                <h2>
                    ${data.name}
                </h2>

                <p>
                    🌡 Temperature:
                    ${data.main.temp} °C
                </p>

                <p>
                    💧 Humidity:
                    ${data.main.humidity}%
                </p>

                <p>
                    🌬 Wind:
                    ${data.wind.speed} m/s
                </p>

            </div>

        `;

        const weather =
            data.weather[0]
            .main
            .toLowerCase();

        document.body.className = "";

        container.innerHTML = "";

        if (weather.includes("rain")) {

            document.body
                .classList
                .add("rain");

            for (let i = 0; i < 100; i++) {

                const drop =
                    document
                    .createElement("div");

                drop.className =
                    "rain-drop";

                drop.style.left =
                    Math.random()
                    * 100
                    + "vw";

                drop.style.animationDuration =
                    Math.random()
                    * 1
                    + 0.5
                    + "s";

                container.appendChild(drop);

            }

        }

        else if (
            weather.includes("snow")
        ) {

            document.body
                .classList
                .add("snow");

            for (let i = 0; i < 50; i++) {

                const snow =
                    document
                    .createElement("div");

                snow.className =
                    "snowflake";

                snow.innerHTML = "❄";

                snow.style.left =
                    Math.random()
                    * 100
                    + "vw";

                snow.style.animationDuration =
                    Math.random()
                    * 3
                    + 2
                    + "s";

                container.appendChild(snow);

            }

        }

        else if (
            weather.includes("clear")
        ) {

            document.body
                .classList
                .add("clear");

            const sun =
                document
                .createElement("div");

            sun.className = "sun";

            container.appendChild(sun);

        }

        else if (
            weather.includes("cloud")
        ) {

            document.body
                .classList
                .add("clouds");

            for (let i = 0; i < 3; i++) {

                const cloud =
                    document
                    .createElement("div");

                cloud.className =
                    "cloud";

                cloud.style.top =
                    Math.random()
                    * 150
                    + "px";

                container.appendChild(cloud);

            }

        }

    }

    catch {

        result.innerHTML =
            "Error fetching weather data";

    }

}

/* ENTER bosilganda search */

document
    .getElementById("cityInput")
    .addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Enter") {

                getWeather();

            }

        }

    );