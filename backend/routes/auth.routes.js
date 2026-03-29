import express from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/me", authMiddleware.protect.bind(authMiddleware), authController.me.bind(authController));

export default router;