import ProductModel from "../model/products.model.js";
import UserModel from "../model/users.model.js";

export default class UserController{

    getRegister(req, res, next){
        res.render("register");
    }

    postRegister(req, res, next){
        const{name, email, password} = req.body;
        UserModel.addUser(name, email, password);
        res.render('login', {errorMessage: null});
    }

    getLogin(req, res, next){
        res.render('login', {errorMessage: null});
    }

    postLogin(req, res, next){
        const{email, password} = req.body;
        const user = UserModel.isValid(email, password);
        req.session.email = email
        if(!user){
            res.render("login", {errorMessage: "Invalid Credentials"});
        }else{
            const products = ProductModel.get()
            res.render("products", {products: products, email: req.session.email})
        }
    }

    logout(req, res, next){
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect("/login")
            }
        })
        res.clearCookie('lastVisit');
    }
}