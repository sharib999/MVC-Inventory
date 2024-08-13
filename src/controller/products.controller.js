import path from "path";
import ProductModel from "../model/products.model.js";

export default class ProductController {

    getProducts(req, res) {
        const products = ProductModel.get();
        res.render("products", { products: products, email: req.session.email });

        // below code is to display the hard coded data through html
        // const products = path.join(path.resolve(), "src", "view", "products.html")
        // return res.sendFile(products)
    };

    getAddForm(req, res) {
        res.render("new-product", { errorMessage: null, email: req.session.email })
    };

    addNewProduct(req, res) {
        const {name, desc, price} = req.body;
        const imageUrl = 'images/'+ req.file.filename
        console.log(imageUrl)
        console.log(req.file)
        ProductModel.addProduct(name, desc, price, imageUrl);
        const products = ProductModel.get();
        res.render("products", { products: products, email: req.session.email })
    };

    getUpdateProductView(req, res, next){
        const product = ProductModel.getProductById(req.params.id);
        if(product){
            res.render("update-product", {product: product, errorMessage: null, email: req.session.email})
        }else{
            res.send('Product not found')
        }
    }

    postUpdateProduct(req, res, next){
        ProductModel.updateProduct(req.body);
        const products = ProductModel.get()
        res.render("products", {products: products, email: req.session.email})
    }

    deleteProduct(req, res, next){
        ProductModel.delete(req.params.id);
        const products = ProductModel.get();
        res.render('products', {products: products, email: req.session.email})
    }
}