import { Link } from "react-router-dom";
import type { Article } from "@/types/article.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <Card className="transition hover:shadow-md">
            <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">
                    <Link to={`/articles/${article._id}`}>{article.title}</Link>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {article.content}
                </p>

                <div className="flex flex-wrap gap-2">
          <span className="rounded-full border px-3 py-1 text-xs">
            {article.category}
          </span>

                    {article.tags?.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs">
              #{tag}
            </span>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground">
                    By {article.author?.name}
                </p>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;