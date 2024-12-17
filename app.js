const button = document.getElementById("search-btn");
const inpCity = document.getElementById("input-city");
const city = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const weatherIcon = document.getElementById("weather-icon");

//fetch weather data
async function getData(cityName) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0eb172f4bd3b4458a9394909240407&q=${cityName}&aqi=yes`);
    return await response.json();
}

// Event listener for search button
button.addEventListener("click", async () => {
    try {
        const cityName = inpCity.value;
        const result = await getData(cityName);

        // Update weather details
        city.innerHTML = `City Name - ${result.location.name}, ${result.location.region}-${result.location.country}`;
        cityTime.innerHTML = `Time - ${result.location.localtime}`;
        cityTemp.innerHTML = `Temp - ${result.current.temp_c}°C`;

        //weather icon from the API
        const iconUrl = `https:${result.current.condition.icon}`;
        weatherIcon.style.backgroundImage = `url(${iconUrl})`;

        //Dynamic background 
        const condition = result.current.condition.text.toLowerCase();
        document.body.className = "";

        if (condition.includes("sunny")) {
            document.body.classList.add("sunny");
        } else if (condition.includes("rain")) {
            document.body.classList.add("rainy");
        } else if (condition.includes("cloud")) {
            document.body.classList.add("cloudy");
        } else if (condition.includes("snow")) {
            document.body.classList.add("snowy");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data. Please check the city name ");
    }
});


//http://api.weatherapi.com/v1/current.json?key=0eb172f4bd3b4458a9394909240407&q=London&aqi=yes
