import api from "@/utils/api";
import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    User,
} from "@/types/auth.types";
class AuthService {
    async login(payload: LoginPayload): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/login", payload);
        return response.data;
    }
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/register", payload);
        return response.data;
    }

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>("/auth/me");
        return response.data;
    }
}

export default new AuthService();