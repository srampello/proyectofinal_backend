//import {promises as fs} from "fs"
//import { nanoid } from "nanoid"
import ProductManager from "./ProductManager.js"
import { cartModel } from "../models/cart.model.js"
//const productAll = new ProductManager

export default class CartManager{
    async createCart(){
        try{
            return await cartModel.create({})
        } catch(error){
            console.log(error)
            return false
        }        
    }

    async deleteCartById(id){
        try{
            return await cartModel.findByIdAndDelete({_id: id})
        } catch(error){
            console.log(error)
            return false
        }
    }

    async saveProductToCart(id, obj){
        try{
            const cart = await cartModel.findById(id)
            cart.products.push(obj.productId)
            cart.save()
            return true
        } catch(error){
            console.log(error)
            return false
        }
    }

    async deleteProductFromCart(id, productId){
        try{
            const cart = await cartModel.findById(id)
            cart.products.remove(productId)
            cart.save()
            return true
        } catch(error){
            console.log(error)
            return false
        }
    }

    async getAllProductsFromCart(id){
        try{
            return await cartModel.findById(id).populate('products').select({products: 1, _id:0})
        } catch(error){
            console.log(error)
            return false
        }
    }
}