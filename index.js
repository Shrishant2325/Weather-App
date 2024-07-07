const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
      getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
          return weather.json();
      }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
  updateTemperatureColor(Math.round(weather.main.temp)); // Call to update the temperature color

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d) {
  let months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
  ];
  let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

// Function to update temperature color
function updateTemperatureColor(temperature) {
  const root = document.documentElement;

  if (temperature < 10) {
      root.style.setProperty("--temp-color-start", "#0099ff");
  }

  else if (temperature > 10 && temperature < 20){
    root.style.setProperty("--temp-color-start", "#00ccff");
  }
  
  else if (temperature > 20 && temperature < 40){
      root.style.setProperty("--temp-color-start", "#ffff33");
  }

  else {
    root.style.setProperty("--temp-color-start", "#ff9966");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Initial call to set the color based on the current temperature
  updateTemperatureColor();
});
