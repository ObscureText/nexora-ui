import { publicApi, type ApiResult } from "./apiClient";

export interface LoginResponse {
    token: string;
    role: string;
}

class AuthApi {
    async login(
        email: string,
        password: string,
    ): Promise<ApiResult<LoginResponse>> {
        try {
            const res = await publicApi.post("/api/auth/login", {
                email,
                password,
            });

            return {
                type: "success",
                data: res.data,
            };
        } catch (err: any) {
            console.log(err);
            return {
                type: "failure",
                errorCode: err.response?.data?.errorCode,
                statusCode: err.response?.status,
            };
        }
    }
}

export const authApi = new AuthApi();
