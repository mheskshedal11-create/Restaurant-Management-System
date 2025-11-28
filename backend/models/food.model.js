import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    foodTags: { type: [String] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isAvailable: { type: Boolean, default: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);