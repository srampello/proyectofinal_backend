import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io"
import http from "http"
import mongoose from "mongoose"
import session from "express-session"
import cookieParser from "cookie-parser"
import flash from 'connect-flash'
import passport from "passport"

import { config } from "dotenv"
config()

import ProductRouter from "./routes/products.routes.js"
import CartRouter from "./routes/cart.routes.js"
import viewsRouter from "./routes/views.router.js"
import AuthRouter from "./routes/auth.routes.js"
import __dirname from "./utils.js"
import './config/passport.js'
import { isLoggedIn } from "./middlewares/validate.auth.middlewares.js"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

//mongoose.connect("mongodb://localhost:27017/iceclub")
//mongoose.connect("mongodb+srv://iceclub:TBdRKwSFvALdREkM@iceclubcluster.ywraoaj.mongodb.net/iceclub?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGO_SRV)

httpServer.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`)
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
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
  });
  

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

//* Google Auth
app.get('/api/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }
))

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/auth/protected',
        failureRedirect: '/api/auth/google/failure'
    })
)

app.get('/api/auth/google/failure', (req, res) => {
    res.send("Somethig went wrong!")
})

app.get('/api/auth/protected', isLoggedIn ,(req, res) => {
    let name = req.user.displayName()
    res.send(`Hello ${name}`)
})


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
