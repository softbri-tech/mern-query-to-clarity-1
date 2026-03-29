import jwt from "jsonwebtoken"
class JwtUtil {
    static generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
    }
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

export default JwtUtil;