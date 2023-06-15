const express = require("express")
const cors = require("cors")
const {connection} = require("./db")
const {userRouter} = require("./Routes/user.routes")
const {blogRouter} = require('./Routes/blog.routes')
const {auth} = require("./Auth/auth.middleware")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use(auth)
app.use("/api",blogRouter)


app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("Connected to DB")
    }catch(err){
        console.log("Can not connected to DB")
    }
    console.log(`Server is running on port ${process.env.port}`)
})