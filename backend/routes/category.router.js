import express from 'express'
import { createCategoryController, deleteCategoryController, getAllCategoryController, getCategoryById, updateCategoryController } from '../controllers/category.controller.js'
import upload from '../middleware/multer.middleware.js'
import { authMiddle } from '../middleware/auth.middleware.js'

const categoryRouter = express.Router()

categoryRouter.post('/create', authMiddle('admin'), upload.single('categoryImage'), createCategoryController)
categoryRouter.get('/getAllCategory', getAllCategoryController)
categoryRouter.get('/category/:id', getCategoryById)
categoryRouter.put('/update/:id', authMiddle('admin'), upload.single('categoryImage'), updateCategoryController)
categoryRouter.delete('/delete/:id', authMiddle('admin'), deleteCategoryController)

export default categoryRouter