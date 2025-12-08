//Defines all routes
import axios from 'axios'
import express from "express"
import 'dotenv/config'
import pool from '../database/db.js'
import currentWeather from '../middleware/currentWeather.js'

const router = express.Router()

//Route to get the locations and their coordinates
router.get('/locations',async (req,res)=>{
  const sql = 'SELECT id,name from coordinates'

  try{
    const [rows] = await pool.query(sql)
    res.json(rows)
  }
  catch(e){
    console.log(e)
    console.log('Failed to fetch coordinates')
    res.status(400).json({error: e})
  }
})

//Route to get the weather from lat and long of the location 
router.get('/weather/:id',currentWeather, async (req, res) => {

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
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data.list;

    // Map the data from the 5 day list to the simplifiedData
    const forecastData = {}
    weatherData.forEach((item)=>{

     const dtKey = item.dt_txt.split(' ')[0]

       forecastData[dtKey] = {
          // city: item.city.name,
          day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: item.main.temp,
          condition: item.weather[0].main,
          description: item.weather[0].description,
          Icon: item.weather[0].icon,
      }
    })

    // Clean up into a nice array to loop easily in the frontend
    let cleanForecast = []

    cleanForecast.push(req.currentForeCast)

    for(const dtkey in forecastData){
       cleanForecast.push(forecastData[dtkey]) // Array  
    }

    res.json(cleanForecast);

  } catch (error) {
    console.error('Error fetching weather data by coords:', error.response?.data?.message || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Could not fetch weather data for the provided coordinates.' 
    });
  }
});

export default router
