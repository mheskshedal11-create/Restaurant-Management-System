import express from "express";
import {
    createRestaurantController,
    getAllRestaurantsController,
    getRestaurantByIdController,
    deleteRestaurantController
} from "../controllers/restaurantController.js";
import { authMiddle } from "../middleware/authMiddleware.js";

const restaurantRouter = express.Router();

restaurantRouter.post("/create", authMiddle, createRestaurantController);
restaurantRouter.get("/getall", getAllRestaurantsController);
restaurantRouter.get("/get/:id", getRestaurantByIdController);
restaurantRouter.delete("/delete/:id", authMiddle, deleteRestaurantController);

export default restaurantRouter;
