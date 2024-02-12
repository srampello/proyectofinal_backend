import {promises as fs} from "fs"
import { nanoid } from "nanoid"
import { productModel } from "../models/product.model.js"

export default class ProductManager{
    static async getAll(){
        return productModel.find().lean()
    }

    static async getById(id){
        return productModel.findOne({_id: id}).lean()
    }

    static async add(name, price, brand, category, image, alt){
        return new productModel({name, price, brand, category, image, alt}).save()
    }

    static async update(id, data){
        return productModel.findOneAndUpdate({_id: id}, data)
    }

    static async remove(id){
        return productModel.findByIdAndDelete(id)
    }
}


/*
export default class ProductManager {
    constructor(){
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    existsProduct = async (id) => {
        let products = await this.readProducts()
        return products.find(products => products.id === id)
    }

    existsCodeProduct = async (code) => {
        let products = await this.readProducts()
        return  products.find(products => products.code === code)
    }

    getLimitProduct = async (limit) =>{
        let get_limit_product = await this.readProducts()
        return get_limit_product.slice(0,limit)
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts()
        product.status = true
        product.id = nanoid(4)
        let existsCode = await this.existsCodeProduct(product.code)
        if(existsCode) return `The code ${product.code} is repeated`
        let productsAll = [...productsOld, product]
        await this.writeProducts(productsAll)
        return "Added product"
    }

    getProduct = async () => {
        return await this.readProducts()
    }

    getProductById = async (id) => {
        let productById = await this.existsProduct(id);
        if(!productById) return "Product not found"
        return productById
    }

    updateProductById = async (id, product) => {
        let productById = await this.existsProduct(id);
        if(!productById) return "Product not found"
        await this.deleteProductById(id)
        let productOld = await this.readProducts()
        let productsNew = [{...product, id: id}, ...productOld]
        await this.writeProducts(productsNew)
        return "Updated product"
    }

    deleteProductById = async (id) => {
        let products = await this.readProducts()
        let productSome = products.some(products => products.id === id)
        if(productSome){
            let productFilter = products.filter(products => products.id != id)
            await this.writeProducts(productFilter)
            return "Removed product"
        }
        return "Non-existent product to be eliminated"
    }
}
*/