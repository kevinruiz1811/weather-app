const apiKey = "0b1205ba7ee78cbae1a7f55b6beac2e3";

const main = document.getElementById("main");
let form = document.getElementById("form-weather");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang={es}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cros",
  });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("clima");

  weather.innerHTML = `
     <h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            ${temp}°C 
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
     </h2>
     <small>${data.weather[0].main}</small>
     
     `;

  //   cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
