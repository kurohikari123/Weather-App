//Defines all routes
import axios from 'axios'
import express from "express"
import pool from '../database/db.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const JWT_SECRET = process.env.JWT_SECRET
const SALT = 10

//REGISTER ROUTE
router.post('/register',async (req,res)=>{

   const email = req.body.email
   const name = req.body.name
   const password = req.body.password

   const sql = "INSERT into user(email,name,password) values(?,?,?)"

   //I need to encrypt the password
   const e_password = await bcrypt.hash(password,SALT)
   try{
   const [sql_result] = await pool.query(sql,[email,name,e_password])
   
   if(sql_result.affectedRows === 1){
      res.status(200).json({'status':1,'message':'Thank you for registering!'})
    }
    else{
      res.status(400).json({'status':3,'message':'Something went wrong!'})
    }
  }
  catch(e){
    res.status(400).json({'status':3,'message':'Internal server Error!'})
  }

})

//Login Route
router.post('/login',async (req,res)=>{

  const email = req.body.email
  const password = req.body.password

  //Need to do this and then compare hashed passwords
  const e_password = await bcrypt.hash(password,SALT)

  try{   

  //Validate email and password before posting
  if(!emailRegex.test(email)){
    res.status(400).json({"status":0,"message":"Invalid email"})
  }

  //Need to get name as well
  const sql = 'select * from user where email = ? '
  const row = await pool.query(sql,[email])
  console.log(row[0][0].password)

  const name = row[0][0].name

  //Check if user exist or not
  if(row[0].length == 0){
    res.json({"status":2,"message":"Invalid email or password"})
  }

  //Test password
  //Also need to set token for verification (JWT)
  if(row[0][0].password == e_password){

    //Create a JWT payload
    const payload = {
        email: email,
    }

    //set JWT token
    const token = jwt.sign(payload, JWT_SECRET,{expiresIn: '1h'})

    res.status(200).json({"status":1,"message":"Login Successful","token":token,"name":name})
  }

  res.json({"status":4,"message":"Invalid email or password"})

  }catch(e){
   console.log(e.message)
   res.json({"status":4,"message":"Login Failed"})
  }
})

export default router
