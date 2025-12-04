//Make your frontend API calls from this file
import axios from "axios"

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
export const getSelectedLocation = async (id) =>{
  const response = await apiClient.get(`/api/weather/${id}`)
  return response.data
}

