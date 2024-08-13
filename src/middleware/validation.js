// validating data using Express validator
import { body, validationResult } from "express-validator";

const validateProductData = async (req, res, next) => {
    const { name, price, imageUrl } = req.body;

    // setting up the rules
    const rules = [
        body('name').notEmpty().withMessage('Invalid Name'),
        body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
        // body('imageUrl').isURL().withMessage("Invalid URL")
        // when using file instead of url
        body('imageUrl').custom((value, {req})=>{
            if(!req.file){
                throw new Error('Image is required')
            }
            return true
        })
    ];

    // running all those rules 
    await Promise.all(rules.map(rule=>rule.run(req)));

    // checking errors after running rules
    var validationError = validationResult(req);

    // if error, rendering the error message
    if(!validationError.isEmpty()){
        res.render("new-product", {errorMessage: validationError.array()[0].msg});
    }else{
        next();
    }
}


// validating data using JS
// const validateProductData = (req, res, next)=>{
//     const {name, price, imageUrl} = req.body;
//     let errors = [];
//     if(!name || name.trim()==""){
//         errors.push("Invalid Name")
//     }
//     if(!price || price != Number(price) || price<1){
//         errors.push("Invalid Price")
//     }
//     try{
//         new URL(imageUrl)
//     }catch(err){
//         errors.push("Invalid URL")
//     }
//     if(errors.length > 0){
//         res.render("new-product", {errorMessage: errors[0]})
//     }
//     else{
//         next();
//     }
// };

export default validateProductData;