import { Router } from "express"
import ProductManager from "../components/ProductManager.js"
import { productModel } from "../models/product.model.js"
const ProductRouter = Router()
//const product = new ProductManager()

//Get all products MongoDB
ProductRouter.get("/", async (req, res) => {
    let products;
    products = await ProductManager.getAll()
    res.render("products", {products})
    /*
    try{
        let products = await productModel.find()
        res.status(200).send({
            status: 200,
            result: "sucess",
            payload: products
        })
    } catch(error){
        console.log("Cannot get users from Mongo: " + error)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        })
    }
    */
})

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id

    if(!id){
        res.redirect("/api/products")
    }

    let product = await ProductManager.getById(id)
    if(!product){
        res.render("404")
    }else{
        res.render("product", {
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            alt: product.alt
        })
    }
    
})
/*
ProductRouter.get("/:pid", async(req, res) => {
    let {pid} = req.params
    
    try{
        let result = await productModel.find({_id:pid})
        res.status(200).send({
            status:200,
            result:"sucess",
            payload:result
        })
    } catch(error){
        console.log("Cannot find product on Mongo: " + error)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error finding product on DB"
        })
    }
})
*/
/*
ProductRouter.get("/", async(req, res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await product.readProducts())
    let limitProduct = await product.getLimitProduct(limit)
    res.status(200).send(limitProduct)
})
*/

/*
ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.status(200).send(await product.addProducts(newProduct))
})

ProductRouter.put("/:pid", async (req, res) => {
    let id = req.params.pid
    let updateProduct = req.body
    res.status(200).send(await product.updateProductById(id, updateProduct))
})

ProductRouter.delete("/:pid", async(req, res) => {
    let id = req.params.pid
    res.status(200).send(await product.deleteProductById(id))
})
*/

export default ProductRouter