//Make your frontend API calls from this file
import axios from "axios"

// const forecastData = [
//   { day: "TODAY", temp: 21, Icon: ClearSkyIcon, condition: "Clear Sky" },
//   { day: "TUE", temp: 13, Icon: CloudIcon, condition: "Cloudy" },
//   { day: "WED", temp: 16, Icon: WavesIcon, condition: "Windy" },
//   { day: "THU", temp: 20, Icon: CloudIcon, condition: "Partly Cloudy" },
//   { day: "FRI", temp: 21, Icon: ClearSkyIcon, condition: "Sunny" },
//   { day: "SAT", temp: 21, Icon: ClearSkyIcon, condition: "Sunny" },
// ];

// condition: "Clear"
// day: "Sat"
// description: "clear sky"
// icon: "01n"
// temperature: 13.86

const apiClient = axios.create({
	baseURL:'http://localhost:3000',
	headers:{
		'Content-Type':'application/json'
	}
})

//Get the locations and IDS from the database
export const getLocations = async ()=>{
  const response = await apiClient.get('/coordinates/locations')
  return response.data
}

// Function to handle selected location
// I need to format the data as well for easy use 
export const getSelectedLocation = async (id) =>{
  const response = await apiClient.get(`/api/weather/${id}`)
  return response.data
}

//Post user data
export const postUser = async (userData) =>{
  const response = await apiClient.post('/user/login',userData)
  return response.data
}
