import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "@/components/articles/ArticleForm";
import articleService from "@/services/article.service";
import type { Article, CreateArticlePayload } from "@/types/article.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

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

    const handleSubmit = async (values: CreateArticlePayload) => {
        if (!id) return;

        try {
            setIsSaving(true);
            const updated = await articleService.updateArticle(id, values);
            navigate(`/articles/${updated._id}`);
        } catch (error) {
            console.error("Failed to update article", error);
        } finally {
            setIsSaving(false);
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
            <div className="mx-auto max-w-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ArticleForm
                            initialValues={{
                                title: article.title,
                                content: article.content,
                                category: article.category,
                                tags: article.tags,
                            }}
                            submitLabel="Update article"
                            isLoading={isSaving}
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default EditArticlePage;