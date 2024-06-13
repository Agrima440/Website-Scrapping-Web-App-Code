const express = require("express");
const colors=require("colors")
const details=require("./data/detail.js")
const morgan=require('morgan')
const dotenv=require("dotenv");
 const connectDB=require("./config/db.js")

 const app=express();

 dotenv.config()
app.use(express.json()) 
app.use(morgan('dev'))
connectDB() 

app.use('/images', express.static('images'));

app.get("/",(req,res)=>{
  res.send("<h1>Welcome to server</h1>")
})

app.get("/details",(req,res)=>{
  res.json(details)
})

app.get("/details/:id",(req,res)=>{
  const detail=details.find((d)=>d._id===req.params.id)
  if(detail){
    res.json(detail);
}
else{
    res.status(404).json({message: "detail Not Found"});
}
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server running on port ${process.env.PORT}`.bgYellow.white))

