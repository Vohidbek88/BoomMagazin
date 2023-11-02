import express from "express";
import routerAuth from "./routes/auth.js";
import routerProducts from "./routes/products.js";
import { create } from 'express-handlebars'
import mongoose from "mongoose";
import *as dotenv from 'dotenv'
import flash from 'connect-flash'
import session from "express-session";
import _varMiddleware from "./middleware/var.js";
import cookieParser from "cookie-parser";
import userMiddleware from "./middleware/user.js";
import util from "./util/index.js";
dotenv.config()

const app = express()


const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers:util
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(flash())
app.use(_varMiddleware)
app.use(userMiddleware)
app.use(session({secret:'vohid',resave:false,saveUninitialized:false}))

app.use(routerAuth)
app.use(routerProducts)

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 4100
app.listen(PORT, () => {
    console.log(`Server is running https://localhost:${PORT}`);
})
  };
  
  connectToMongo();




