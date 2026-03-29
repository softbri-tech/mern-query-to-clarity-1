import { Router } from "express";
import ArticleController from "../controllers/article.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = Router();

const articleController = new ArticleController();
const authMiddleware = new AuthMiddleware();

router.get("/", articleController.getAll.bind(articleController));
router.get("/:id", articleController.getById.bind(articleController));
router.post("/", authMiddleware.protect.bind(authMiddleware), articleController.create.bind(articleController));
router.put("/:id", authMiddleware.protect.bind(authMiddleware), articleController.update.bind(articleController));
router.delete("/:id", authMiddleware.protect.bind(authMiddleware), articleController.delete.bind(articleController));

export default router;