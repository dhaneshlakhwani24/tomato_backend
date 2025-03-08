import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"; // Add this line
import orderRouter from "./routes/orderRoute.js"; // Add this line
import 'dotenv/config'; // Load environment variables

// Log the MONGO_URI for debugging
console.log("MONGO_URI:", process.env.MONGO_URI); // Log the MONGO_URI for debugging
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined. Please check your .env file.");
}

// app config
const app = express()
const port = 4000; // Define the port for the server

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
