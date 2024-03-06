import express from 'express';
const router = express.Router();
import ProductManager from "../components/ProductManager.js"
import {isAuthenticated} from "../middlewares/validate.auth.middlewares.js"

const product = new ProductManager()

router.get("/", async (req, res) =>{
    console.log(req.session)
    res.render("home")
})

router.get('/chat', (req, res) => {
    res.render("ichat", {
        title: "chat socket"
    })
})

router.get('/profile', isAuthenticated ,(req, res) => {
    res.render("profile")
})

export default router;
