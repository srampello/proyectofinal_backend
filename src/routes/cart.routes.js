import { Router } from "express"
import CartManager from "../components/CartManager.js"
import ProductManager from "../components/ProductManager.js"

const CartRouter = Router()
const cart = new CartManager()

//! GET
//* /api/cart/:cid/products
CartRouter.get('/:cid/products', async(req, res) => {
    const {id} = req.params
    const cartProducts = await cart.getAllProductsFromCart(id)
    if (cartProducts.length) {
        res.status(200).json(cartProducts)
    } else {
        res.status(404).json({"error": "cart not found or has no products."})
    }
})

//! POST
//* /api/cart
CartRouter.post('/', async (req, res) => {
    const newCart = await cart.createCart()
    newCart
        ? res.status(200).json({"succes" : "new cart added with ID " + newCart._id})
        : res.status(400).json({"error" : "there was an error"})
})

//* /api/cart/:cid/products/:pid
CartRouter.post('/:cid/products/pid', async(req,res) => {
    const { cid, pid } = req.params;
    const productExists = await ProductManager.exists(pid);
    if(productExists) {
        const obj = await ProductManager.getById(pid)
        await carritoDao.saveProductToCart(cid, obj)
    } else {
        res.status(404).json({"error": "product not found"});
    }  
})


//! DELETE
//* /api/cart/:cid
CartRouter.delete('/:cid', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carritoDao.deleteById(id);
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
})

//* /api/cart/:cid/products/:pid
CartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    const wasDeleted = await cart.deleteProductFromCart(cid, pid)
    wasDeleted
        ? res.status(200).json({"success": "taht product is no longer in the cart"})
        : res.status(400).json({"error" : "there was some problems"})
})

export default CartRouter