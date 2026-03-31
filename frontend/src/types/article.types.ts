export interface Author {
    _id: string;
    name: string;
    email: string;
}

export interface Article {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: Author;
    createdAt: string;
    updatedAt: string;
}

export interface CreateArticlePayload {
    title: string;
    content: string;
    category: string;
    tags: string[];
}

export interface UpdateArticlePayload {
    title: string;
    content: string;
    category: string;
    tags: string[];
}

export interface ArticleQueryParams {
    search?: string;
    category?: string;
    tag?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedArticlesResponse {
    items: Article[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}