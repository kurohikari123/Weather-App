//Defines all routes
import axios from 'axios'
import express from "express"
import 'dotenv/config'

const router = express.Router()


router.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const apiKey = process.env.OPEN_WEATHER_API;
  // Note the different API endpoint structure: uses lat and lon
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    const simplifiedData = {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
    };

    res.json(simplifiedData);

  } catch (error) {
    console.error('Error fetching weather data by coords:', error.response?.data?.message || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Could not fetch weather data for the provided coordinates.' 
    });
  }
});

export default router;
