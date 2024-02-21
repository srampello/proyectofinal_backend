import {promises as fs} from "fs"
import { nanoid } from "nanoid"
import { productModel } from "../models/product.model.js"
import { paginate } from "mongoose-paginate-v2"

export default class ProductManager{
    static async exists(id){
        return await productModel.findById(id)
    }

    static async getAll(_page){
        //return productModel.find().limit(limit).sort(sort).lean()
        return productModel.paginate({},{_page, lean: true})
    }

    static async getLimitProduct(limit){
        return productModel.find().limit(limit).lean()
    }

    static async getById(id){
        return productModel.findOne({_id: id}).lean()        
    }

    static async getByBrand(bid){
        return productModel.find({brand: bid}).lean()
    }

    static async createProduct(object){
        return await productModel.create(object)
    }

    static async updateProductById(id, data){
        return productModel.findOneAndUpdate({_id: id}, data)
    }

    static async deleteProductById(id){
        return productModel.findByIdAndDelete({_id: id})
    }
}
