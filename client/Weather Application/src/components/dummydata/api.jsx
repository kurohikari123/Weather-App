//Make your frontend API calls from this file
import axios from "axios"

const apiClient = axios.create({
	baseURL:'http://localhost:3000',
	headers:{
		'Content-Type':'application/json'
	}
})

//Get the locations and IDS from the database
const getLocations = async ()=>{
  const response = await apiClient.get('/coordinates/locations')
  return response.data
}

export default getLocations
