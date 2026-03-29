import Article from "../models/article.model.js";

class ArticleQueryService {
    buildFilters(queryParams) {
        const { search, category, tag, author } = queryParams;
        const filters = {};

        if (category) {
            filters.category = category;
        }

        if (author) {
            filters.author = author;
        }

        if (tag) {
            filters.tags = { $in: [tag] };
        }

        if (search) {
            filters.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ];
        }

        return filters;
    }

    buildSort(sortBy) {
        switch (sortBy) {
            case "oldest":
                return { createdAt: 1 };
            case "updated":
                return { updatedAt: -1 };
            case "title":
                return { title: 1 };
            default:
                return { createdAt: -1 };
        }
    }

    buildPagination(page = 1, limit = 10) {
        const currentPage = Math.max(Number(page) || 1, 1);
        const perPage = Math.max(Number(limit) || 10, 1);
        const skip = (currentPage - 1) * perPage;

        return {
            page: currentPage,
            limit: perPage,
            skip,
        };
    }

    async execute(queryParams) {
        const filters = this.buildFilters(queryParams);
        const sort = this.buildSort(queryParams.sortBy);
        const { page, limit, skip } = this.buildPagination(
            queryParams.page,
            queryParams.limit
        );

        const [items, total] = await Promise.all([
            Article.find(filters)
                .populate("author", "name email")
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Article.countDocuments(filters),
        ]);

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
}

export default new ArticleQueryService();