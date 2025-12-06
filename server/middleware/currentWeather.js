import axios from 'axios'
import express from "express"
import 'dotenv/config'
import pool from '../database/db.js'

//Route to get the current weather/forecast
const currentWeather  = async (req,res,next)=>{
  const loc_id = req.params.id

  //Log the ID to check
  console.log(loc_id)

  const sql = 'SELECT lat,lon from coordinates where id = ?'
  const [row] = await pool.query(sql,[loc_id])
  const {lat, lon} = row[0]
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const apiKey = process.env.OPEN_WEATHER_API;
  // Note the different API endpoint structure: uses lat and lon
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

 try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    const currentData =   {
          day: "Today",
          temp: weatherData.main.temp,
          condition: weatherData.weather[0].main,
          description: weatherData.weather[0].description,
          Icon: weatherData.weather[0].icon,
      }
   
    // currentForeCast = currentData
    // console.log(currentForeCast)

    req.currentForeCast = currentData
    next()

  } catch (error) {
    console.error('Error fetching weather data by coords:', error.response?.data?.message || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Could not fetch weather data for the provided coordinates.' 
    });
  }
}

export default currentWeather
