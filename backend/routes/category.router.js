import express from 'express'
import { createCategoryController, deleteCategoryController, getAllCategoryController, getCategoryById, updateCategoryController } from '../controllers/category.controller.js'
import upload from '../middleware/multer.middleware.js'

const categoryRouter = express.Router()
categoryRouter.post('/create', upload.single('categoryImage'), createCategoryController)
categoryRouter.get('/getAllCategory', getAllCategoryController)
categoryRouter.get('/category/:id', getCategoryById)
categoryRouter.put('/udpate/:id', upload.single('categoryImage'), updateCategoryController)
categoryRouter.delete('/delete/:id', deleteCategoryController)
export default categoryRouter