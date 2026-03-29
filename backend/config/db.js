import mongoose from "mongoose";

class Database {
    static instance;

    constructor() {
        if(Database.instance){
            return Database.instance
        }
        Database.instance = this;
    }
    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {});
            console.log('MongoDB Connected');
        } catch (error){
            console.error(`Error connecting to MongoDB: ${error.message}`)
        }
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database;