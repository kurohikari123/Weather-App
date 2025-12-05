// src/components/WeatherIcon.js
import React from 'react';
import {
  WbSunny,        // Clear Day
  NightsStay,     // Clear Night
  Cloud,          // Cloudy
  Grain,          // Rain/Drizzle
  AcUnit,         // Snow
  Thunderstorm,   // Thunder
  Dehaze,         // Mist/Fog
  CloudQueue      // Partly Cloudy
} from '@mui/icons-material';

export default function WeatherIcon({ code }) {
  // 1. Define common styling to match your dashboard theme
  // pure white, slightly larger, maybe a drop shadow for "pop"
  const iconStyle = {
    fontSize: '2.5rem', 
    color: '#ffffff',
    filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
  };

  // 2. Map OpenWeatherMap codes to Material UI Icons
  // OWM Codes: https://openweathermap.org/weather-conditions
  switch (code) {
    // --- Clear Sky ---
    case '01d': return <WbSunny sx={{ ...iconStyle, color: '#FFD700' }} />; // Gold for sun
    case '01n': return <NightsStay sx={iconStyle} />;

    // --- Few Clouds / Partly Cloudy ---
    case '02d': 
    case '02n': return <CloudQueue sx={iconStyle} />;

    // --- Scattered / Broken Clouds ---
    case '03d':
    case '03n':
    case '04d':
    case '04n': return <Cloud sx={iconStyle} />;

    // --- Rain / Drizzle ---
    case '09d':
    case '09n':
    case '10d':
    case '10n': return <Grain sx={iconStyle} />;

    // --- Thunderstorm ---
    case '11d':
    case '11n': return <Thunderstorm sx={iconStyle} />;

    // --- Snow ---
    case '13d':
    case '13n': return <AcUnit sx={iconStyle} />;

    // --- Mist / Fog ---
    case '50d':
    case '50n': return <Dehaze sx={iconStyle} />;

    // --- Default / Unknown ---
    default: return <Cloud sx={iconStyle} />;
  }
}
