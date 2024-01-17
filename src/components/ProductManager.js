import {promises as fs} from "fs"
import { nanoid } from "nanoid"

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

    getLimitProduct = async (limit) =>{
        let get_limit_product = await this.readProducts()
        return get_limit_product.slice(0,limit)
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts()
        product.status = true
        product.id = nanoid(4)
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

    /*
    addProduct = async (title, description, code, price, status, stock, category, thumbnail) => {

        ProductManager.id++

        let newProduct = {
            title, 
            description,
            code,
            price, 
            status : true,
            stock,
            category,
            thumbnail, 
            id: ProductManager.id
        }

        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))

        /*
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code){
                console.log(`El codigo ${code} esta repetido`);
                return;
            }
        }
        
        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
                this.products.push({
                    ...newProduct,
                    id: ProductManager.id 
                });
        }else{
            console.log("Todos los campos son Requeridos")
        }

        return "Producto Agregado"
    }*/
}
