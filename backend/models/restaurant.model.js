import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    time: { type: String },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    logoUrl: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 1 },
    ratingCount: { type: Number, default: 0 },
    code: { type: String },
    coords: {
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String },
        title: { type: String }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);