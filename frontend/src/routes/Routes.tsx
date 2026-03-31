import {Route, Routes, Navigate} from "react-router";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import ArticlesPage from "@/components/articles/ArticlesPage.tsx";
import CreateArticlePage from "@/components/articles/CreateArticlePage.tsx";
import ArticleDetailsPage from "@/components/articles/ArticleDetailsPage.tsx";
import EditArticlePage from "@/components/articles/EditArticlePage.tsx";
import ProtectedRoute from "@/components/ProtectedRoutes.tsx";
import DashboardPage from "@/pages/DashboardPage.tsx";

const Router = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/articles/create" element={<CreateArticlePage />} />
                    <Route path="/articles/:id" element={<ArticleDetailsPage />} />
                    <Route path="/articles/:id/edit" element={<EditArticlePage />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router