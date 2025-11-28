import Food from "../model/food.model.js";
import Restaurant from "../model/restaurant.model.js";
import mongoose from "mongoose";

// Create Food
export const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, restaurant, isAvailable, rating } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, description, price and restaurant"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(restaurant)) {
            return res.status(400).json({ success: false, message: "Invalid restaurant ID" });
        }

        const newFood = new Food({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        });

        await newFood.save();

        // Add food to restaurant's foods array
        await Restaurant.findByIdAndUpdate(restaurant, { $push: { foods: newFood._id } });

        res.status(201).json({
            success: true,
            message: "Food created successfully",
            food: newFood
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create food" });
    }
};

// Get all foods
export const getAllFoodController = async (req, res) => {
    try {
        const allFood = await Food.find().populate("restaurant");

        res.status(200).json({
            success: true,
            message: "Foods fetched successfully",
            foods: allFood
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch foods" });
    }
};

// Get food by ID
export const getFoodByIdController = async (req, res) => {
    try {
        const foodId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ success: false, message: "Invalid food ID" });
        }

        const food = await Food.findById(foodId).populate("restaurant");

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.status(200).json({ success: true, message: "Food fetched successfully", food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch food" });
    }
};

