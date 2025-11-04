import { ClearSkyIcon, CloudIcon, WavesIcon } from "../icons/WeatherIcons";

const forecastData = [
  { day: "TODAY", temp: 21, Icon: ClearSkyIcon, condition: "Clear Sky" },
  { day: "TUE", temp: 13, Icon: CloudIcon, condition: "Cloudy" },
  { day: "WED", temp: 16, Icon: WavesIcon, condition: "Windy" },
  { day: "THU", temp: 20, Icon: CloudIcon, condition: "Partly Cloudy" },
  { day: "FRI", temp: 21, Icon: ClearSkyIcon, condition: "Sunny" },
  { day: "SAT", temp: 21, Icon: ClearSkyIcon, condition: "Sunny" },
  { day: "SUN", temp: 27, Icon: CloudIcon, condition: "Cloudy" },
];

const scheduleData = [
  { time: "16:30h", event: "Stay at Bohém Art Hotel" },
  { time: "18:30h", event: "Dinner at Cafe Luna" },
];

export { forecastData, scheduleData };
