import express from 'express';
const router = express.Router();
import ProductManager from "../components/ProductManager.js"

const product = new ProductManager()

router.get("/", async (req, res) =>{
    let allProducts = await product.getProduct()
    res.render("home", {
        title: "Backend | Handlebars",
        products: allProducts
    })
})

router.get('/realtimeproducts', (req, res) => {
    res.render("realTimeProducts", {
        title: "RealTime Products"
    })
})

router.get('/chat', (req, res) => {
    res.render("chat", {
        title: "chat socket"
    })
})


export default router;