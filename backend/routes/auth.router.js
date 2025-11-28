import express from "express";

import { loginController, registerController } from "../controllers/auth.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerController);
router.post('/login', loginController)

export default router;
