import express from "express";
import cors from "cors";
import testRoute from "./routes/routes.js"

const app = express();
const route = express.Router();


//All middleware here
app.use(cors());
app.use(express.json());

//Default Router
app.get('/',(req,res)=>{
	res.send("Weather server is running...")
})

//Specify the API calls here
app.use('/api',testRoute)

app.listen(3000, () => {
  console.log("Server started in http://localhost:3000");
});
