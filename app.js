let loc = document.querySelector("#location");
let tempIcon = document.querySelector("#weatherIcon");
let tempValue = document.querySelector("#tempValue");
let tempTypeValue = document.querySelector("#tempTypeText");
let iconFile;

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#button-addon2");

const API_KEY = `44bf76ab8ce87ca0df758c3dfdfdef63`;


searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});



const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );

    const weatherData = await response.json();
    getWeatherData(weatherData);
  } catch (e) {
    alert("City not found");
  }
};

window.addEventListener("load", () => {
  let lat;
  let long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

      fetch(API)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          getWeatherData(data);
        });
    });
  }
});


function getWeatherData(data) {
    const { name } = data;
    const { feels_like } = data.main;
    const { id, main } = data.weather[0];
    console.log(data);
    loc.textContent = name;
    tempTypeValue.textContent = main;
    tempValue.textContent = Math.round(feels_like - 273);
    if (id <= 232 && id >= 200) {
      tempIcon.src = "./images/thunder.png";
    } else if (id <= 321 && id >= 300) {
      tempIcon.src = "./images/drizzle.png";
    } else if (id <= 531 && id >= 500) {
      tempIcon.src = "./images/rain.png";
    } else if (id <= 622 && id >= 600) {
      tempIcon.src = "./images/snow.png";
    } else if (id <= 781 && id >= 700) {
      tempIcon.src = "./images/atmosphere.png";
    } else if (id == 800) {
      tempIcon.src = "./images/clear.png";
    } else if (id <= 804 && id > 800) {
      tempIcon.src = "./images/cloudy.png";
    }
  }