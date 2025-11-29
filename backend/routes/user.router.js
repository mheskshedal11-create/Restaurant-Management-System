import express from 'express'
import { deleteAccount, getUserController, updateController } from '../controllers/user.controller.js'
import { authMiddle } from '../middleware/auth.middleware.js'
import upload from "../middleware/multer.middleware.js";

const userRouter = express.Router()

userRouter.get('/getUser', authMiddle(), getUserController);
userRouter.put('/updateUser', authMiddle(), upload.single('profileImage'), updateController)
userRouter.delete('/deleteaccount', authMiddle(), deleteAccount)

export default userRouter