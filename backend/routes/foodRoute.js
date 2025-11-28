import express from "express";

import { authMiddle } from "../middleware/authMiddleware.js";
import { createFoodController, getFoodByIdController, getAllFoodController, } from "../controllers/foodConroller.js";
import { getRestaurantByIdController } from "../controllers/restaurantController.js";


const foodRouter = express.Router();

foodRouter.post("/create", authMiddle, createFoodController);
foodRouter.get("/getall", getAllFoodController);
foodRouter.get("/get/:id", getFoodByIdController);
foodRouter.get("/restaurant/:id", getRestaurantByIdController);

export default foodRouter;
