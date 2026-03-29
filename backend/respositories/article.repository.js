import Article from "../models/article.model.js";

class ArticleRepository {
    async create(articleData) {
        return Article.create(articleData);
    }

    async findById(id) {
        return Article.findById(id).populate("author", "name email");
    }

    async updateById(id, updateData) {
        return Article.findByIdAndUpdate(id, updateData, {
            new: true,
        }).populate("author", "name email");
    }

    async deleteById(id) {
        return Article.findByIdAndDelete(id);
    }
}

export default new ArticleRepository();