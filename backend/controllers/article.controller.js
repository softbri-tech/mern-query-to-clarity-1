import articleService from "../services/article.service.js";

class ArticleController {
    async create(req, res, next) {
        try {
            const result = await articleService.createArticle(req.body, req.user._id);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await articleService.getArticles(req.query);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const result = await articleService.getArticleById(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const result = await articleService.updateArticle(
                req.params.id,
                req.body,
                req.user._id
            );
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const result = await articleService.deleteArticle(
                req.params.id,
                req.user._id
            );
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default ArticleController;