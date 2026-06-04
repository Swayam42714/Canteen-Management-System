import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//db connetion
try {
    await connectDB();
} catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
}

//api endpoits
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

const frontendDist = path.join(__dirname, "../FrontEnd/dist")
const adminDist = path.join(__dirname, "admin/dist")

app.use("/admin", express.static(adminDist))
app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(adminDist, "index.html"))
})

app.use(express.static(frontendDist))

app.get("/",(req,res)=>{
    res.sendFile(path.join(frontendDist, "index.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"))
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://stynpgetgo:<db_password>@cluster0.ktv5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
