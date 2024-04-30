// Define the API URL and API key for OpenWeatherMap
const APIURL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "YOUR_API_KEY_HERE";

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
  const url = `${APIURL}?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data); // Display current weather
    } else {
      displayError("City not found. Please try again with a valid city name.");
    }
  } catch (error) {
    // Handle errors if fetching data fails
    console.error("Error fetching weather data:", error);
    displayError("Failed to fetch weather data. Please try again.");
  }
}

// Function to display current weather
function displayWeather(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const weatherDiv = document.getElementById("weather-info");

  // Update the HTML content to display city, temperature, and weather description
  weatherDiv.innerHTML = `
    <p><b>City:</b> ${city}</p>
    <p><b>Temperature:</b> ${temperature} °C</p>
    <p><b>Weather:</b> ${weatherDescription}</p>`;
}

// Function to display error message
function displayError(message) {
  const weatherInfo = document.getElementById("weather-info");

  // Update the HTML content to display error message
  weatherInfo.innerHTML = `<p>${message}</p>`;
}

// Function to get current time
function getCurrentTime() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const datetimeDiv = document.getElementById("date-time");

  // Update the HTML content to display the current time
  datetimeDiv.innerHTML = `<p>${formattedDate}</p>`;

  return formattedDate;
}

// Function to handle form submission (button click or Enter key press)
function handleSubmit() {
  const cityInput = document.getElementById("city").value.trim();

  if (cityInput) {
    fetchWeather(cityInput);
  } else {
    displayError("Please enter a city name.");
  }
}

// Get a reference to the input field and submit button
const cityInput = document.getElementById("city");
const submitBtn = document.getElementById("submitBtn");

// Add event listeners
cityInput.addEventListener("keydown", handleKeyDown);
submitBtn.addEventListener("click", handleSubmit);

// Function to handle the "keydown" event
function handleKeyDown(event) {
  if (event.key === "Enter") {
    handleSubmit();
  }
}

getCurrentTime();
