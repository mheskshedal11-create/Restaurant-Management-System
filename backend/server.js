import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import categoryRouter from "./routes/category.router.js";
import menuItemRouter from "./routes/menuitem.router.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/order.router.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

dbConnection();


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/menu-item', menuItemRouter)
app.use('/api/v1/order', orderRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});