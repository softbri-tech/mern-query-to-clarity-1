import {Route, Routes, Navigate} from "react-router";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";

const Router = () => {
    return (
        <>
            
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    )
}

export default Router