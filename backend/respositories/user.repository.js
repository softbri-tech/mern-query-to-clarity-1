import User from "../models/user.model.js";

class UserRepository {
    async findByEmail(email){
        return User.findOne({email});
    }
    async findById(id){
        return User.findById(id);
    }
    async create(userData){
        return User.create(userData);
    }
}

export default new UserRepository();