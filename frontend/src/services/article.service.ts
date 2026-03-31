import api from "@/utils/api";
import type {
    Article,
    ArticleQueryParams,
    CreateArticlePayload,
    PaginatedArticlesResponse,
    UpdateArticlePayload,
} from "@/types/article.types";

class ArticleService {
    async getArticles(
        params?: ArticleQueryParams
    ): Promise<PaginatedArticlesResponse> {
        const response = await api.get<PaginatedArticlesResponse>("/articles", {
            params,
        });
        return response.data;
    }

    async getArticleById(id: string): Promise<Article> {
        const response = await api.get<Article>(`/articles/${id}`);
        return response.data;
    }

    async createArticle(payload: CreateArticlePayload): Promise<Article> {
        const response = await api.post<Article>("/articles", payload);
        return response.data;
    }

    async updateArticle(
        id: string,
        payload: UpdateArticlePayload
    ): Promise<Article> {
        const response = await api.put<Article>(`/articles/${id}`, payload);
        return response.data;
    }

    async deleteArticle(id: string): Promise<{ message: string }> {
        const response = await api.delete<{ message: string }>(`/articles/${id}`);
        return response.data;
    }
}

export default new ArticleService();