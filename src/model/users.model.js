export default class UserModel{
    constructor(id, name, email, password){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    static addUser(name, email, password){
        const newUser = new UserModel(users.length + 1, name, email, password);
        users.push(newUser);
    }

    static isValid(email, password){
        return users.find(user => user.email == email && user.password == password);
    }
}

var users = []