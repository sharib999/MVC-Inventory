import multer from "multer";

const storingFile = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "src/public/images/")
    },
    filename: (req, file, cb)=>{
        const name = Date.now() + "-" + file.originalname;
        cb(null, name)
    }
})

export const fileUpload = multer({
    storage: storingFile
})