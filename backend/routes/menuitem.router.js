import express from 'express';
import { createItemController, deleteMenuItem, getAllMenuItemController, getMenuItemById } from '../controllers/menuitem.controller.js';
import upload from '../middleware/multer.middleware.js';
import { authMiddle } from '../middleware/auth.middleware.js';

const menuItemRouter = express.Router();

menuItemRouter.post('/create', authMiddle('admin'), upload.array("itemImage", 5), createItemController);
menuItemRouter.get('/get-allItem', getAllMenuItemController);
menuItemRouter.get('/menu-item/:id', getMenuItemById);
menuItemRouter.delete('/delete-item/:id', authMiddle('admin'), deleteMenuItem);

export default menuItemRouter;