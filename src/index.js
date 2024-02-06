import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io";
import http from "http"

import ProductRouter from "./routes/products.routes.js"
import ProductManager from "./components/ProductManager.js";
import CartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"

const product = new ProductManager()

const app = express()
const PORT = 8080
const httpServer = http.createServer(app)
const io = new Server(httpServer)

httpServer.listen(PORT, () => {
    console.log(`App running at port ${PORT}`)
})

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
io.on("connection", (socket) => {
    console.log("Client connected");

    // socket.on('event', function)

    socket.on("disconnect", () => {
        console.log("A user disconnected")
    })

    socket.on("message", (msg) => {
        io.emit("message", msg)
    })

    //socket.emit("recibirProductos", product.getProduct());
  });