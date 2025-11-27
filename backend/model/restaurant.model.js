import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "",
        },
        foods: [
            {
                type: String,
            },
        ],
        time: {
            type: String,
        },
        pickup: {
            type: Boolean,
            default: true,
        },
        delivery: {
            type: Boolean,
            default: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        logoUrl: {
            type: String,
        },
        rating: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: Number,
            default: 0,
        },
        code: {
            type: String,
        },

        coords: {
            id: { type: String },
            latitude: { type: Number },
            latitudeDelta: { type: Number },
            longitude: { type: Number },
            longitudeDelta: { type: Number },
            address: { type: String },
            title: { type: String },
        },
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
