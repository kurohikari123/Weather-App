//Defines all routes
import axios from 'axios'
import express from "express"
import pool from '../database/db.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const router = express.Router()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const JWT_SECRET = process.env.JWT_SECRET

//Login Route
router.post('/login',async (req,res)=>{

  const email = req.body.email
  const password = req.body.password

  try{   

  //Validate email and password before posting
  if(!emailRegex.test(email)){
    res.status(400).json({"status":0,"message":"Invalid email"})
  }

  const sql = 'select password from user where email = ? '
  const row = await pool.query(sql,[email])
  console.log(row[0][0])

  //Check if user exist or not
  if(row[0].length == 0){
    res.json({"status":2,"message":"Invalid email or password"})
  }

  //Test password
  //Also need to set token for verification (JWT)
  if(row[0][0].password == password){

    //Create a JWT payload
    const payload = {
        email: email,
    }

    //set JWT token
    const token = jwt.sign(payload, JWT_SECRET,{expiresIn: '1h'})

    res.status(200).json({"status":1,"message":"Login Successful","token":token})
  }

  res.json({"status":4,"message":"Invalid email or password"})

  }catch(e){
   console.log(e.message)
   res.json({"status":4,"message":"Login Failed"})
  }
})

export default router
