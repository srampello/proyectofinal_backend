import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io"
import http from "http"
import mongoose from "mongoose"
import session from "express-session"
import cookieParser from "cookie-parser"

import ProductRouter from "./routes/products.routes.js"
import CartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.router.js"
import AuthRouter from "./routes/auth.routes.js"
import __dirname from "./utils.js"

const app = express()
const PORT = 8080
const httpServer = http.createServer(app)
const io = new Server(httpServer)

//mongoose.connect("mongodb://localhost:27017/iceclub")
mongoose.connect("mongodb+srv://iceclub:TBdRKwSFvALdREkM@iceclubcluster.ywraoaj.mongodb.net/iceclub?retryWrites=true&w=majority")

httpServer.listen(PORT, () => {
    console.log(`App running at port ${PORT}`)
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser())

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

app.use("/", viewsRouter)
app.use("/api/products", ProductRouter);
app.use('/api/cart', CartRouter);
app.use('/api/auth', AuthRouter)
app.use((req, res, next) => {
    res.render("404")
})

//Socket.io
let socketsConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket){
    console.log("New client connected: " + socket.id);
    socketsConnected.add(socket.id)

    io.emit('client-total', socketsConnected.size)

    socket.on('disconnect', () =>{
        console.log("Client disconnected" + socket.id)
        socketsConnected.delete(socket.id)
        io.emit('client-total', socketsConnected.size)
    })

    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data)
      })

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })
}
