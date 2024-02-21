import { Router } from "express"
import ProductManager from "../components/ProductManager.js"
import { productModel } from "../models/product.model.js"
import { paginate, paginateSubDocs } from "mongoose-paginate-v2"
const ProductRouter = Router()
const product = new ProductManager()

//! GET
//* /api/products
//* /api/products?limit=?page=?sort=
ProductRouter.get("/", async (req, res) => {
    let limit = req.query.limit || 6
    let page = req.query.page || 1
    let sort = req.query.sort || "name"
    let products = await productModel.paginate({},{limit, page, sort ,lean:true})
    products.prevLink = products.hasPrevPage?`http://localhost:8080/api/products?page=${products.prevPage}`:'';
    products.nextLink = products.hasNextPage?`http://localhost:8080/api/products?page=${products.nextPage}`:'';
    products.isValid = !(page<=0 || page>products.totalPages)
    products
        ? res.status(200).render("products", products)
        : res.status(400).render("404")
})

//* /api/product/brand/:bid?limit=?page=?sort=
ProductRouter.get("/brand/:bid", async(req, res) => {
    let limit = req.query.limit || 6
    let page = req.query.page || 1
    let sort = req.query.sort || "name"
    const {bid} = req.params
    const products = await productModel.paginate({brand: bid}, {limit, page, sort, lean: true})
    products
        ? res.render("products", products)
        : res.status(400).render("404")
})

//* /api/products/:id
ProductRouter.get("/:pid", async (req, res) => {
    const product = await productModel.findById(req.params.pid)
    if(!product){
        res.status(400).render("404")
    }else{
        res.status(200).render("product", {
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            alt: product.alt
        })
    }
})

//! POST
//* /api/products (newProduct)
ProductRouter.post("/", async (req, res) => {
    const {body} = req.body
    const newProduct = await productModel.create(body)
    newProduct
        ? res.status(200).json({"success": "product added with ID " + newProduct._id})
        : res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
})

//* /api/products/:pid (updateProduct)
ProductRouter.put("/:pid", async (req, res) => {
    const {id} = req.params
    const {body} = req.body
    const wasUpdated = await product.updateProductById(id, body)
    wasUpdated
        ? res.status(200).json({"succes" : "product updated"})
        : res.status(400).json({"error" : "product not found or invalid body content"})
})

//! DELETE
//* /api/products/:pid
ProductRouter.delete("/:pid", async(req, res) => {
    const {id} = req.params
    const wasDeleted = await product.deleteProductById(id)
    wasDeleted
        ? res.status(200).json({"success" : "product successfully removed"})
        : res.status(400).json({"error" : "product not found"})
})

export default ProductRouter