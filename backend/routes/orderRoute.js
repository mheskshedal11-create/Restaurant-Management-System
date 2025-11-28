import express from "express";
import { authMiddle } from "../middleware/authMiddleware.js";
import { createOrderController, getUserOrdersController } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", authMiddle, createOrderController);
router.get("/myorders", authMiddle, getUserOrdersController);

export default router;