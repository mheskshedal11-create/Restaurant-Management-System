import express from 'express';
import {
    createOrderController,
    getMyOrdersController,
    getOrderByIdController,
    updateOrderStatusController,
    getAllOrdersController,
    cancelOrderController,
    deleteOrderController
} from '../controllers/order.controller.js';
import { authMiddle } from '../middleware/auth.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/create', authMiddle(), createOrderController);
orderRouter.get('/my-orders', authMiddle(), getMyOrdersController);
orderRouter.get('/:id', authMiddle(), getOrderByIdController);
orderRouter.put('/cancel/:id', authMiddle(), cancelOrderController);

orderRouter.get('/all', authMiddle('admin'), getAllOrdersController);
orderRouter.put('/update-status/:id', authMiddle('admin'), updateOrderStatusController);
orderRouter.delete('/delete/:id', authMiddle('admin'), deleteOrderController);

export default orderRouter;