import { Router } from "express"
import ProductManager from "../components/ProductManager.js"
const ProductRouter = Router()
const product = new ProductManager()

ProductRouter.get("/", async(req, res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await product.readProducts())
    let limitProduct = await product.getLimitProduct(limit)
    res.status(200).send(limitProduct)
})

ProductRouter.get("/:pid", async(req, res) => {
    let id = req.params.pid
    res.status(200).send(await product.getProductById(id))
})

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

export default ProductRouter