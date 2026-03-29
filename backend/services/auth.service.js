import ApiError from "../utils/ApiError.js";
import UserRepository from "../respositories/user.repository.js";
import bcrypt from "bcryptjs";
import JwtUtil from "../utils/JwtUtil.js";
class AuthService {

    async register(name,email,password){
        if(!name || !email || !password){
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await UserRepository.findByEmail(email);

        if(existingUser){
            throw new ApiError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserRepository.create({
            name,
            email,
            password: hashedPassword
        });
        return {
            token: JwtUtil.generateToken(user._id),
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        }
    }
    async login(email, password){
        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid credentials");
        }

        return {
            token: JwtUtil.generateToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async getCurrentUser(userId) {
        const user = await UserRepository.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
    }
}
export default new AuthService();