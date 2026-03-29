import articleRepository from "../respositories/article.repository.js";
import ApiError from "../utils/ApiError.js";
import articleQueryService from "./article.query.service.js";

class ArticleService {
    async createArticle(data, userId) {
        const { title, content, category, tags } = data;

        if (!title || !content) {
            throw new ApiError(400, "Title and content are required");
        }

        const article = await articleRepository.create({
            title,
            content,
            category,
            tags,
            author: userId,
        });

        return article;
    }

    async getArticles(queryParams) {
        return articleQueryService.execute(queryParams);
    }

    async getArticleById(articleId) {
        const article = await articleRepository.findById(articleId);

        if (!article) {
            throw new ApiError(404, "Article not found");
        }

        return article;
    }

    async updateArticle(articleId, data, userId) {
        const article = await articleRepository.findById(articleId);

        if (!article) {
            throw new ApiError(404, "Article not found");
        }

        if (article.author._id.toString() !== userId.toString()) {
            throw new ApiError(403, "You are not allowed to update this article");
        }

        return articleRepository.updateById(articleId, data);
    }

    async deleteArticle(articleId, userId) {
        const article = await articleRepository.findById(articleId);

        if (!article) {
            throw new ApiError(404, "Article not found");
        }

        if (article.author._id.toString() !== userId.toString()) {
            throw new ApiError(403, "You are not allowed to delete this article");
        }

        await articleRepository.deleteById(articleId);

        return { message: "Article deleted successfully" };
    }
}

export default new ArticleService();