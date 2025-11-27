import express from 'express'
import { deleteAccount, getUserController, resetPasswordController, updateController } from '../controllers/userController.js'
import { authMiddle } from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.get('/getUser', authMiddle, getUserController)
userRouter.put('/upateUser', authMiddle, updateController)
userRouter.post('/resetPassword', authMiddle, resetPasswordController)
userRouter.delete('/deleteaccount', authMiddle, deleteAccount)

export default userRouter