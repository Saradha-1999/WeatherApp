import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rainy_icon from '../assets/rainy.png'
import sunny_icon from '../assets/sunny.png'
import windy_icon from '../assets/windy.png'
import snow_icon from '../assets/snow.png'


const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons ={
    "01d":sunny_icon,
    "01n":sunny_icon,
    "02d":cloudy_icon,
    "02n":cloudy_icon,
    "03d":cloudy_icon,
    "03n":cloudy_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rainy_icon,
    "09n":rainy_icon,
    "10d":rainy_icon,
    "10n":rainy_icon,
    "13d":snow_icon,
    "13n":snow_icon,
   }

  const search = async (city)=>{

    if(city === ''){
      alert('Please enter a city name');
      return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    
        const response = await fetch(url);
        const  data = await response.json();

        if(!response.ok){
          alert(data.message || 'City not found');
          return;
        }

        console.log(data);
        const icon = allIcons[data.weather[0].icon] || cloudy_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          feelslike: Math.floor(data.main.feels_like),
          mintemperature:Math.floor(data.main.temp_min),
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        })

      } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    search('London'); 
  }, []);

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search for a city...' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>

        {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature} C</p>
        <p className='location'>{weatherData.location}</p> 
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={windy_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} kmph</p>
              <span>Wind Speed</span>
            </div>
          </div>

          <div className="col">
            <img src={cloudy_icon} alt="" />
            <div>
              <p>{weatherData.feelslike} C</p>
              <span>Feels Like</span>
            </div>
          </div>
          
          <div className="col">
            <img src={cloudy_icon} alt="" />
            <div>
              <p>{weatherData.mintemperature} C</p>
              <span>Min Temperature</span>
            </div>
          </div>

        </div>
        </>:<></>}

        

    </div>
  )
}

export default Weather