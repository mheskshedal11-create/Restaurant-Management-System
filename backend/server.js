import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
//rest object
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))

//route

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${8000}`)
})