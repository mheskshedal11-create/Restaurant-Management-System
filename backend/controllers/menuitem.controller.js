import MenuItem from "../models/menuItem.model.js";
import ErrorHandler from '../utils/error.handler.js';
import SuccessHandler from '../utils/success.handler.js';
import fs from "fs";
import path from "path";
import { itemValidation } from "../validations/item.validation.js";

export const createItemController = async (req, res, next) => {
    try {
        const { error } = itemValidation.validate(req.body);
        if (error) {
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => fs.unlinkSync(file.path));
            }
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const { itemName, itemDescription, price, category, tag, discount } = req.body;

        if (!itemName || !itemDescription || !price) {
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => fs.unlinkSync(file.path));
            }
            return next(new ErrorHandler("All fields are required", 400));
        }

        const existingItem = await MenuItem.findOne({ itemName });
        if (existingItem) {
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => fs.unlinkSync(file.path));
            }
            return next(new ErrorHandler('Item with this name already exists', 400));
        }

        let imagePath = [];
        if (req.files && req.files.length > 0) {
            imagePath = req.files.map(file => file.filename);
        } else {
            return next(new ErrorHandler("At least 1 image is required", 400));
        }

        const discountValue = discount || 0;
        const finalPrice = price - (price * discountValue) / 100;

        const newItem = new MenuItem({
            itemName,
            itemDescription,
            price,
            finalPrice: finalPrice,
            discount: discountValue,
            category,
            itemImage: imagePath,
            tag: tag || []
        });

        await newItem.save();

        return new SuccessHandler("Item created successfully", { newItem }, 200).send(res);

    } catch (error) {
        console.log(error);
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => fs.unlinkSync(file.path));
        }
        return next(new ErrorHandler("Something went wrong", 500));
    }
};

export const getAllMenuItemController = async (req, res, next) => {
    try {
        const allitem = await MenuItem.find({});
        if (allitem.length === 0) {
            return next(new ErrorHandler('No menu items found', 404));
        }
        return new SuccessHandler('Menu items fetched successfully', { allitem }, 200).send(res);
    } catch (error) {
        next(error);
    }
};


export const getMenuItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await MenuItem.findById(id);
        if (!item) {
            return next(new ErrorHandler('Menu item not found', 404));
        }
        return new SuccessHandler('Item fetched successfully', { item }, 200).send(res);
    } catch (error) {
        next(error);
    }
};


export const deleteMenuItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);

        const deletedItem = await MenuItem.findById(id);

        if (!deletedItem) {
            return next(new ErrorHandler('Menu item not found', 404));
        }

        if (deletedItem.itemImage && deletedItem.itemImage.length > 0) {
            deletedItem.itemImage.forEach(filename => {
                const filePath = path.join('public', filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted image: ${filePath}`);
                }
            });
        }

        await MenuItem.findByIdAndDelete(id);

        return new SuccessHandler('Menu item deleted successfully', { deletedItem }, 200).send(res);
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Something went wrong", 500));
    }
};