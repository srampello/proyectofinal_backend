import express from 'express';
const router = express.Router();
import ProductManager from "../components/ProductManager.js"

const product = new ProductManager()

router.get("/", async (req, res) =>{
    res.render("home")
})

router.get('/chat', (req, res) => {
    res.render("chat", {
        title: "chat socket"
    })
})


export default router;
