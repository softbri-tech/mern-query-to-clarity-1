import JwtUtil from "../utils/JwtUtil.js";
import userRepository from "../respositories/user.repository.js";

class AuthMiddleware {
    async protect(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Not authorized" });
            }

            const token = authHeader.split(" ")[1];
            const decoded = JwtUtil.verifyToken(token);

            const user = await userRepository.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
            };

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token invalid or expired" });
        }
    }
}

export default AuthMiddleware;