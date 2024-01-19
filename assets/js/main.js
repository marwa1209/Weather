//today elements
let dayName = document.getElementById("dayName");
let dateToday = document.getElementById("date");
let city = document.getElementById("city");
let degree = document.getElementById("degree");
let wetherStatuesImg =document.getElementById("wether-statues-img");
let todyStatues = document.getElementById("tody-statues"); 
let wind = document.getElementById("wind");
let fast = document.getElementById("fast");
let direction = document.getElementById("direction");
//tomorrow elements
let tomorrowDay = document.querySelectorAll("#tomorrow-day");
let TommoreDegree = document.querySelectorAll("#degree-tom");
let TommoreDegreeSmall = document.querySelectorAll("#degree-tom-small");
let tomorrowimg = document.querySelectorAll("#img-tom");
let statuesTommorrow = document.querySelectorAll("#statues-tom");
//search Input
let searchInput = document.getElementById("search");

//fetch data
async function fetchdata(city){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d82b2c0afe2d4c63a42165440241801&q=${city}&days=3`);
   let  data = await response.json();
     return data;
}
//display today
function displayTodayData(data){
const date = new Date(data.forecast.forecastday[0].date);
const dayOfWeekIndex = date.getDay();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeekString = daysOfWeek[dayOfWeekIndex];
dayName.innerHTML = dayOfWeekString;
const options = { day: "numeric", month: "long" };
const dateWithoutYear = date.toLocaleString("en-US", options);
dateToday.innerHTML = dateWithoutYear;
city.innerHTML = data.location.name;
degree.innerHTML=data.current.temp_c;
todyStatues.innerHTML=data.current.condition.text;
wind.innerHTML = data.current.humidity+"%";
fast.innerHTML = data.current.wind_kph + "km/hr";
direction.innerHTML = data.current.wind_dir;
wetherStatuesImg.setAttribute("src",data.current.condition.icon)

}
//display tommorrows
function displaytommorrowData(data) {

  let forcastData = data.forecast.forecastday;
  for (let index = 0; index < 2; index++) {
  tomorrowimg[index].setAttribute("src", forcastData[index+1].day.condition.icon);
  const date = new Date(data.forecast.forecastday[index+1].date);
  const dayOfWeekIndex = date.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekString = daysOfWeek[dayOfWeekIndex];
  tomorrowDay[index].innerHTML = dayOfWeekString;
TommoreDegree[index].innerHTML=forcastData[index+1].day.maxtemp_c+"<sup>O</sup>C"
TommoreDegreeSmall[index].innerHTML = forcastData[index + 1].day.mintemp_c+"<sup>O</sup>";
statuesTommorrow[index].innerHTML = forcastData[index + 1].day.condition.text;
  }

}
async function StartApp(city="cairo") {
  let weatherData = await fetchdata(city);
  if (!weatherData.error) {
      displayTodayData(weatherData);
      displaytommorrowData(weatherData);
  }

}

 StartApp();

searchInput.addEventListener("input",function(){
  if (searchInput.value!="") {
    StartApp(searchInput.value);
  } else {
    StartApp();
  }

})