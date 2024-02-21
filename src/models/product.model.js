import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

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

productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model(productCollection, productSchema)
