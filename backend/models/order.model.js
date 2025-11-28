import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [{
        food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending", enum: ["pending", "confirmed", "preparing", "outfordelivery", "delivered", "cancelled"] },
    paymentStatus: { type: String, default: "pending", enum: ["pending", "paid", "failed"] },
    deliveryAddress: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);