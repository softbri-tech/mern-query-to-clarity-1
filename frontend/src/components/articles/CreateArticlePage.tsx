import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ArticleForm from "@/components/articles/ArticleForm";
import articleService from "@/services/article.service";
import type { CreateArticlePayload } from "@/types/article.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateArticlePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: CreateArticlePayload) => {
        try {
            setIsLoading(true);
            const article = await articleService.createArticle(values);
            navigate(`/articles/${article._id}`);
        } catch (error) {
            console.error("Failed to create article", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Create article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ArticleForm
                            submitLabel="Create article"
                            isLoading={isLoading}
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default CreateArticlePage;