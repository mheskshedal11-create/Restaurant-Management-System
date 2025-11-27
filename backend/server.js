import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import router from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

dbConnection();

app.use("/api/v1/auth", router);
app.use('/api/v1/user', userRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
