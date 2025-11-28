import MenuCategory from "../models/menu.category.model.js"
import ErrorHandler from "../utils/error.handler.js"
import SuccessHandler from "../utils/success.handler.js"
import fs from 'fs'
import path from "path";
//create category
export const createCategoryController = async (req, res, next) => {
    try {
        const { categoryName, description } = req.body

        const existingCategory = await MenuCategory.findOne({ categoryName })
        if (existingCategory) {
            if (req.file) fs.unlinkSync(req.file.path)
            return next(new ErrorHandler('Category already exists', 400))
        }

        const categoryImagePath = req.file ? req.file.filename : ''

        const newMenuCategory = new MenuCategory({
            categoryName,
            description,
            categoryImage: categoryImagePath
        })

        await newMenuCategory.save()

        new SuccessHandler('Category created successfully', { newMenuCategory }, 201).send(res)

    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path)
        next(new ErrorHandler(error.message, 500))
    }
}

//get all category
export const getAllCategoryController = async (req, res, next) => {
    try {
        const allCategory = await MenuCategory.find({});

        if (allCategory.length === 0) {
            return next(new ErrorHandler('No categories available', 404));
        }

        new SuccessHandler(
            'Categories fetched successfully',
            { categories: allCategory },
            200
        ).send(res);

    } catch (error) {
        next(new ErrorHandler("Can't fetch the categories", 500));
    }
};

//get category by ID 
export const getCategoryById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const category = await MenuCategory.findById(id);

        if (!category) {
            return next(new ErrorHandler('Category not found', 404));
        }

        new SuccessHandler(
            'Category fetched successfully',
            { category },
            200
        ).send(res);

    } catch (error) {
        next(new ErrorHandler('Cannot fetch category', 500));
    }
};


//update category 
export const updateCategoryController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { categoryName, description } = req.body;

        const category = await MenuCategory.findById(id);

        if (!category) {
            if (req.file) fs.unlinkSync(req.file.path);
            return next(new ErrorHandler("Category not found", 404));
        }

        let imagePath = category.categoryImage;

        if (req.file) {
            const oldImageFullPath = path.join(process.cwd(), imagePath);

            if (fs.existsSync(oldImageFullPath)) {
                fs.unlinkSync(oldImageFullPath);
            }

            imagePath = req.file.path;
        }

        const updated = await MenuCategory.findByIdAndUpdate(
            id,
            { categoryName, description, categoryImage: imagePath },
            { new: true }
        );

        new SuccessHandler(
            "Category updated successfully",
            { category: updated },
            200
        ).send(res);

    } catch (error) {
        console.error(error);
        if (req.file) fs.unlinkSync(req.file.path);
        next(new ErrorHandler("Server error", 500));
    }
};

// delete category 

export const deleteCategoryController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await MenuCategory.findById(id);

        if (!category) {
            return next(new ErrorHandler("Category not found", 404));
        }

        const imagePath = category.categoryImage;
        if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
            fs.unlinkSync(path.join(process.cwd(), imagePath));
        }

        await MenuCategory.findByIdAndDelete(id);

        new SuccessHandler(
            "Category deleted successfully",
            null,
            200
        ).send(res);

    } catch (error) {
        console.error(error);
        next(new ErrorHandler("Server error", 500));
    }
};