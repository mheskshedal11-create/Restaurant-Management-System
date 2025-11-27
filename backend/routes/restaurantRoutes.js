import express from 'express';
import {
    createRestaurantController,
    getAllRestaurantsController,
    getRestaurantByIdController,
    deleteResturantController
} from '../controllers/restaurantController.js';
import { authMiddle } from '../middleware/authMiddleware.js';

const restaurantRouter = express.Router();

restaurantRouter.post('/create', createRestaurantController);
restaurantRouter.get('/getall', getAllRestaurantsController);
restaurantRouter.get('/get/:id', getRestaurantByIdController);
restaurantRouter.delete('/delete', authMiddle, deleteResturantController)

export default restaurantRouter;
