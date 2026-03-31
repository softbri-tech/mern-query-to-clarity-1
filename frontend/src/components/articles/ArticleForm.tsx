import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateArticlePayload } from "@/types/article.types";

interface ArticleFormProps {
    initialValues?: CreateArticlePayload;
    submitLabel?: string;
    isLoading?: boolean;
    onSubmit: (values: CreateArticlePayload) => Promise<void>;
}

const ArticleForm = ({
                         initialValues,
                         submitLabel = "Save article",
                         isLoading = false,
                         onSubmit,
                     }: ArticleFormProps) => {
    const [formData, setFormData] = useState<CreateArticlePayload>(
        initialValues || {
            title: "",
            content: "",
            category: "",
            tags: [],
        }
    );

    const [tagsInput, setTagsInput] = useState(
        initialValues?.tags?.join(", ") || ""
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const normalizedTags = tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        await onSubmit({
            ...formData,
            tags: normalizedTags,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Article title"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Backend"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="react, typescript, mern"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your article content..."
                    className="min-h-[220px]"
                    required
                />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Saving..." : submitLabel}
            </Button>
        </form>
    );
};

export default ArticleForm;