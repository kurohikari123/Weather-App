//Make your frontend API calls from this file
import axios from "axios"

const apiClient = axios.create({
	baseUrl:'http://localhost:3000',
	headers:{
		'Content-Type':'application/json'
	}
})

const getWeatherCity = (lat,lon) =>{
	return apiClient.get('/api/weather',{
		params:{lat,lon}
	})
}

export default getWeatherCity
