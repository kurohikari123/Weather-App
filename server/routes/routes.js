//Defines all routes
import express from "express"
import axios from "axios";
import "dotenv/config";

const router = express.Router()

let open_weather_api_key = process.env.OPEN_WEATHER_API;
//Get city weather
router.get("/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    res.status(400).json({ error: "City not found!" });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${open_weather_api_key}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    res.json(weatherData); //All weather data
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not find complete request" });
  }
});

export default router;
