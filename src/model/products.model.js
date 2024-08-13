

export default class ProductModel {

    constructor(id, name, desc, price, imageUrl) {
        this.id = id
        this.name = name
        this.desc = desc
        this.price = price
        this.imageUrl = imageUrl
    }

    static get() {
        return products
    }

    static addProduct(name, desc, price, imageUrl) {
        const product = new ProductModel(products.length + 1, name, desc, price, imageUrl);
        products.push(product)
    }

    static getProductById(id) {
        return products.find(product => product.id == id);
    }

    static updateProduct(objProduct) {
        const index = products.findIndex(product => product.id == objProduct.id);
        products[index] = objProduct;
    }

    static delete(id) {
        const index = products.findIndex(product => product.id == id);
        products.splice(index, 1);
    }
}

var products = [
    {
        id: 1,
        name: "Atomic Habits",
        desc: "A supremely practical and useful book.",
        price: 300,
        imageUrl: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
    },
    {
        id: 2,
        name: "Ikigai",
        desc: "The Japanese secret to a long and happy life",
        price: 300,
        imageUrl: "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
    },
    {
        id: 3,
        name: "Deep Work",
        desc: "RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD",
        price: 300,
        imageUrl: "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
    }
]