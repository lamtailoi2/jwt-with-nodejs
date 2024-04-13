import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import registerRouter from "./src/routes/registerRoute.js"
import crypto from "crypto"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const port = 3000


mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connected");
})

app.use(cors({
    origin: "*",
    methods: ['GET', 'PUT', 'POST', "DELETE"],
    
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1", registerRouter)


app.get("/", (req, res) => {
    res.json("Hello")
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    // const random = crypto.randomBytes(32).toString('hex')
    // console.log(random);
})