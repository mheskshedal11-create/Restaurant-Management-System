import mongoose from "mongoose";
const menuCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    }
}, { timestamps: true })
const MenuCategory = mongoose.model('MenuCategory', menuCategorySchema)
export default MenuCategory