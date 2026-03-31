import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articleService from "@/services/article.service";
import type { Article } from "@/types/article.types";
import ArticleCard from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const result = await articleService.getArticles(
                search ? { search } : undefined
            );
            setArticles(result.items);
        } catch (error) {
            console.error("Failed to fetch articles", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchArticles();
    };

    return (
        <main className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-6xl space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Articles</h1>
                        <p className="text-muted-foreground">
                            Browse and manage your knowledge base content.
                        </p>
                    </div>

                    <Button>
                        <Link to="/articles/create">Create article</Link>
                    </Button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-3">
                    <Input
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit">Search</Button>
                </form>

                {isLoading ? (
                    <p>Loading articles...</p>
                ) : articles.length === 0 ? (
                    <p className="text-muted-foreground">No articles found.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {articles.map((article) => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default ArticlesPage;