import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io";

import ProductRouter from "./routes/products.routes.js"
import ProductManager from "./components/ProductManager.js";
import CartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"

const product = new ProductManager()

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () =>
    console.log(`Server working in port ${PORT}`)
)

const socketServer = new Server(httpServer)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

app.use("/", viewsRouter)
app.use("/api/products", ProductRouter);
app.use('/api/cart', CartRouter);

//Socket.io
socketServer.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.emit("recibirProductos", product.getProduct());
  });