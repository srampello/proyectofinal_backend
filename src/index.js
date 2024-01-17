import express from "express"
import ProductRouter from "./routes/products.routes.js"
import CartRouter from "./routes/cart.routes.js"

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/api/products", ProductRouter);
app.use('/api/cart', CartRouter);

const PORT=8080;
app.listen(PORT,()=>{
    console.log(`Server working in port ${PORT}`);
});