// src/pages/DashboardPage.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <main className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="rounded-2xl border bg-background p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold">Dashboard</h1>
                            <p className="mt-2 text-muted-foreground">
                                Welcome back, {user?.name}.
                            </p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>

                        <div className="flex gap-3">
                            <Button>
                                <Link to="/articles">View articles</Link>
                            </Button>
                            <Button variant="outline" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border bg-background p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">User module</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Authentication flow is connected and protected routes are active.
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Next step</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Continue with the article module and connect content creation to authenticated users.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;