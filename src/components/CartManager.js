import {promises as fs} from "fs"
import { nanoid } from "nanoid"
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager

export default class CartManager{
    constructor(){
        this.path = "./src/models/carts.json"
    }

    existsCarts = async (id) => {
        let carts = await this.readCarts()
        return carts.find(carts => carts.id === id)
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid(4)
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Cart added"
    }

    getCartsById = async (id) => {
        let cartById = await this.existsCarts(id);
        if(!cartById) return "Cart not found"
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let cartsById = await this.existsCarts(cartId);
        if(!cartsById) return "Cart not found"
        let productById = await productAll.existsProduct(productId)
        if(!productById) return "Product not found"

        let cartsAll  = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId)

        if(cartsById.products.some((prod) => prod.id === productId)){
            let moreProductInCart = cartsById.products.find((prod) => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [cartsById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Product in cart one more item is added"
        }
        cartsById.products.push({ id: productById.id, cantidad: 1})
        let cartsConcat = [cartsById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Product added to cart"
        
        
    }
}