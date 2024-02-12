import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    brand: String,
    price: {
        type: String,
        require: true
    },
    category: String,
    image: String,
    alt: String,
})

export const productModel = mongoose.model(productCollection, productSchema)