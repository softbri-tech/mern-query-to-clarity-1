import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import articleService from "@/services/article.service";
import type { Article } from "@/types/article.types";
import { Button } from "@/components/ui/button";

const ArticleDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                const result = await articleService.getArticleById(id);
                setArticle(result);
            } catch (error) {
                console.error("Failed to fetch article", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;

        try {
            await articleService.deleteArticle(id);
            navigate("/articles");
        } catch (error) {
            console.error("Failed to delete article", error);
        }
    };

    if (isLoading) {
        return <main className="p-6">Loading article...</main>;
    }

    if (!article) {
        return <main className="p-6">Article not found.</main>;
    }

    return (
        <main className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-4xl space-y-6 rounded-2xl border bg-background p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                        <h1 className="text-3xl font-semibold">{article.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            By {article.author?.name} · {article.category}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {article.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-muted px-3 py-1 text-xs"
                                >
                  #{tag}
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button  variant="outline">
                            <Link to={`/articles/${article._id}/edit`}>Edit</Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="whitespace-pre-wrap leading-7 text-foreground/90">
                    {article.content}
                </div>
            </div>
        </main>
    );
};

export default ArticleDetailsPage;