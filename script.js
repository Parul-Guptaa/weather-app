const apikey = "6b5f2f8fd2a925231270713dc796593f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) return;

    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/clear.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        searchBox.value = "";
    }
}

// Click on button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Press Enter
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
