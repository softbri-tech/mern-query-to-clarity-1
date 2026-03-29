import authService from "../services/auth.service.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const result = await authService.register(name, email, password);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    async me(req, res, next) {
        try {
            const result = await authService.getCurrentUser(req.user._id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController