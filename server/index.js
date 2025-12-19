import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/api.js"
import userRoute from "./routes/user.js"
import 'dotenv/config'

const app = express();
const route = express.Router();


//All middleware here
app.use(cors());
app.use(express.json());

//Default Router
app.get('/',(req,res)=>{
	res.send("Weather server is running...")
})

//Specify the API calls and routes here
app.use('/api',weatherRoutes)
app.use('/coordinates',weatherRoutes)

//Specify the User call routes here
app.use('/user',userRoute)
app.use('/register',userRoute)

app.listen(3000, () => {
  console.log("Server started in http://localhost:3000");
});
