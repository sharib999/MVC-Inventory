// importing necessary packages
import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";

// importing internal modules
import ProductController from "./src/controller/products.controller.js";
import validateProduct from "./src/middleware/validation.js";
import { fileUpload } from "./src/middleware/upload-file.js";
import UserController from "./src/controller/users.controller.js";
import { auth } from "./src/middleware/auth.js";
import { lastVisit } from "./src/middleware/lastVisit.js";

// creating server 
export const server = express();

// serving static folder
server.use(express.static('src/public'))

//creating view engine templates
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "view"));

// parse form data
server.use(express.urlencoded({extended: true}));


// creating layout for ejs
server.use(ejsLayouts);

// creating session and cookie
server.use(cookieParser());
server.use(lastVisit);
server.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// creating instances
const productController = new ProductController();
const userController = new UserController();

// creating middleware
server.get('/', auth, productController.getProducts);
server.get('/register', userController.getRegister);
server.get('/login', userController.getLogin);
server.get('/logout', userController.logout);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.get('/new', auth, productController.getAddForm);
server.post('/register', userController.postRegister);
server.post('/login', userController.postLogin);
server.post('/', auth, fileUpload.single('imageUrl'), validateProduct, productController.addNewProduct);
server.post('/update-product', auth, productController.postUpdateProduct)
server.post('/delete-product/:id', auth, productController.deleteProduct)
server.use(express.static('src/view'));