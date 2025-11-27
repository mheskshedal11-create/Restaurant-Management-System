import Restaurant from "../model/restaurant.model.js";

export const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        } = req.body;

        if (!title || !coords) {
            return res.status(400).json({
                success: false,
                message: "Title and coords are required"
            });
        }

        const restaurant = new Restaurant({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        });

        await restaurant.save();

        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});

        res.status(200).json({
            success: true,
            message: "Restaurants fetched successfully",
            restaurants
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not fetch restaurants"
        });
    }
};

export const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Restaurant fetched successfully",
            restaurant
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch restaurant"
        });
    }
};


export const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot delete restaurant"
        });
    }
};