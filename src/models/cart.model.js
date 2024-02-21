import mongoose from "mongoose";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ]
});

export const cartModel = mongoose.model(cartCollection, cartSchema);