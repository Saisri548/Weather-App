import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import axios from "axios"
import './App.css'
import { WiDaySunny,WiCloudy,WiRain,WiFog,WiSnow,WiDayHaze } from 'react-icons/wi';

function App() {
  const countryNames = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  JP:"Japan"
  // Add more countries as needed
};

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const[query,setQuery]=useState(" ");
  const[weatherData,setWeatherData]=useState(null);
  const handleQuery=async ()=> {
    if (query.trim() === "") return;
    try{
    const response=await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
     )
     setWeatherData(response.data)
     setQuery("")
    }catch(error){
  alert("City name Not found")
  console.log("error")
    }

  }
  const getWeatherIcon=(weatherIcon)=>{
    if(!weatherIcon) return null;
    const main=weatherIcon.toLowerCase();
    if (main.includes("clear")||main.includes("sun"))  return <WiDaySunny size={60} color="orange"/>
    if(main.includes("cloud")) return <WiCloudy size={60} color="gray"/>
      if (main.includes("rain") || main.includes("drizzle")) return <WiRain size={60} color="blue" />;
  if (main.includes("thunder")) return <WiThunderstorm size={60} color="purple" />;
  if (main.includes("snow")) return <WiSnow size={60} color="lightblue" />;
  if (main.includes("haze")) return <WiDayHaze size={60} color="lightblue" />;
    return <WiDaySunny size={60} color="orange"/> 
  }
 

  return(
    <>
   
    <div className="card">
     <div className="header">
      <input type="text" 
      placeholder="Enter city name" 
      value={query}
      onChange={(e)=>setQuery(e.target.value)}/>   
      <FiSearch className="search-icon" onClick={handleQuery}/> 
      </div>
      <div className="result-item">
        {weatherData && 
        <>
        <h2>{weatherData.name}, {countryNames[weatherData.sys.country] || weatherData.sys.country}</h2>
        <p className="Temperature">🌡Temperature:{weatherData.main.temp}°C</p>
         <p>💧Humidity:{weatherData.main.humidity}%</p>
         <p> 💨WindSpeed:{weatherData.wind.speed}Km/h</p>
         <p>Condition:{weatherData.weather[0].main}</p>
         {getWeatherIcon(weatherData.weather[0].main)}
        </>
        }
      </div>
      
    </div>
    </>
  )
}

export default App
