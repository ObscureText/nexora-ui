import { authApi, type ApiResult } from "./apiClient";

export interface UserProfileResponse {
    user: {
        id: string;
        email: string;
        role: string;
    };
    service_provider: {
        id: string;
        name: string;
        email: string;
        mobile_number: string;
        address: string;
    };
}

class UserApi {
    private async getProfile(
        endpoint: string,
    ): Promise<ApiResult<UserProfileResponse>> {
        try {
            const res = await authApi.get(endpoint);

            return {
                type: "success",
                data: res.data,
            };
        } catch (err: any) {
            return {
                type: "failure",
                errorCode: err.response?.data?.errorCode,
                statusCode: err.response?.status,
            };
        }
    }

    async getIndividualProfile() {
        return this.getProfile("/api/individual/profile");
    }

    async getEstablishmentProfile() {
        return this.getProfile("/api/establishment/profile");
    }

    async getAdminProfile() {
        return this.getProfile("/api/admin/profile");
    }
}

export const userApi = new UserApi();
