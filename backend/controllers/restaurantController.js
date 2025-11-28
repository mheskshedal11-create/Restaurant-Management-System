import mongoose from "mongoose";
import Restaurant from "../model/restaurant.model.js";

// Create Restaurant
export const createRestaurantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;

        if (!title || !coords) {
            return res.status(400).json({
                success: false,
                message: "Title and coords are required"
            });
        }

        const restaurant = new Restaurant({
            title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords
        });

        await restaurant.save();

        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get All Restaurants
export const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate("foods"); // Populate food details

        res.status(200).json({
            success: true,
            message: "Restaurants fetched successfully",
            restaurants
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Could not fetch restaurants" });
    }
};

// Get Restaurant by ID
export const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ success: false, message: "Invalid restaurant ID" });
        }

        const restaurant = await Restaurant.findById(restaurantId).populate("foods");

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        res.status(200).json({ success: true, message: "Restaurant fetched successfully", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch restaurant" });
    }
};

// Delete Restaurant
export const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ success: false, message: "Invalid restaurant ID" });
        }

        const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        res.status(200).json({ success: true, message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Cannot delete restaurant" });
    }
};
