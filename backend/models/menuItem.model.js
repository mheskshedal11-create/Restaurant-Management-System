import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    itemDescription: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    finalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuCategory',
        default: null
    },
    itemImage: {
        type: [String],
        default: []
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    tag: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;