import Order from "../model/order.model.js";
import Food from "../model/food.model.js";

export const createOrderController = async (req, res) => {
    try {
        const { items, deliveryAddress, phone } = req.body;
        if (!items || items.length === 0 || !deliveryAddress || !phone) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let totalPrice = 0;
        const populatedItems = [];

        for (let item of items) {
            const food = await Food.findById(item.food);
            if (!food || !food.isAvailable) return res.status(400).json({ success: false, message: `Food ${item.food} not available` });
            totalPrice += food.price * item.quantity;
            populatedItems.push({ food: item.food, quantity: item.quantity });
        }

        const order = await Order.create({
            user: req.userId,
            restaurant: populatedItems[0].food.restaurant || (await Food.findById(populatedItems[0].food)).restaurant,
            items: populatedItems,
            totalPrice,
            deliveryAddress,
            phone
        });

        res.status(201).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

export const getUserOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).populate("items.food").sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};