import Order from "../models/order.model.js";
import MenuItem from "../models/menuitem.model.js";
import ErrorHandler from '../utils/error.handler.js';
import SuccessHandler from '../utils/success.handler.js';

export const createOrderController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { items, deliveryAddress, phone } = req.body;

        if (!items || items.length === 0) {
            return next(new ErrorHandler("Order must contain at least one item", 400));
        }

        if (!deliveryAddress || !phone) {
            return next(new ErrorHandler("Delivery address and phone are required", 400));
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItemId);

            if (!menuItem) {
                return next(new ErrorHandler(`Menu item ${item.menuItemId} not found`, 404));
            }

            const itemTotal = menuItem.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                menuItem: menuItem._id,
                quantity: item.quantity,
                price: menuItem.price
            });
        }

        const newOrder = new Order({
            user: userId,
            items: orderItems,
            totalAmount,
            deliveryAddress,
            phone
        });

        await newOrder.save();

        const populatedOrder = await Order.findById(newOrder._id)
            .populate('user', 'fullName email')
            .populate('items.menuItem', 'itemName itemImage price');

        return SuccessHandler(res, 201, "Order created successfully", populatedOrder);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error creating order", 500));
    }
};

export const getMyOrdersController = async (req, res, next) => {
    try {
        const userId = req.userId;

        const orders = await Order.find({ user: userId })
            .populate('items.menuItem', 'itemName itemImage price')
            .sort({ createdAt: -1 });

        return SuccessHandler(res, 200, "Orders fetched successfully", orders);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error fetching orders", 500));
    }
};

export const getOrderByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const userRole = req.user.role;

        const order = await Order.findById(id)
            .populate('user', 'fullName email phone')
            .populate('items.menuItem', 'itemName itemImage price');

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        if (userRole !== 'admin' && order.user._id.toString() !== userId.toString()) {
            return next(new ErrorHandler("Not authorized to view this order", 403));
        }

        return SuccessHandler(res, 200, "Order fetched successfully", order);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error fetching order", 500));
    }
};

export const getAllOrdersController = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'fullName email phone')
            .populate('items.menuItem', 'itemName price')
            .sort({ createdAt: -1 });

        return SuccessHandler(res, 200, "All orders fetched successfully", orders);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error fetching orders", 500));
    }
};

export const updateOrderStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return next(new ErrorHandler("Invalid status", 400));
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('items.menuItem', 'itemName price');

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        return SuccessHandler(res, 200, "Order status updated successfully", order);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error updating order status", 500));
    }
};

export const cancelOrderController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const order = await Order.findById(id);

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        if (order.user.toString() !== userId.toString()) {
            return next(new ErrorHandler("Not authorized to cancel this order", 403));
        }

        if (order.status === 'delivered') {
            return next(new ErrorHandler("Cannot cancel delivered order", 400));
        }

        if (order.status === 'cancelled') {
            return next(new ErrorHandler("Order is already cancelled", 400));
        }

        order.status = 'cancelled';
        await order.save();

        return SuccessHandler(res, 200, "Order cancelled successfully", order);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error cancelling order", 500));
    }
};

export const deleteOrderController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        return SuccessHandler(res, 200, "Order deleted successfully", null);

    } catch (error) {
        return next(new ErrorHandler(error.message || "Error deleting order", 500));
    }
};