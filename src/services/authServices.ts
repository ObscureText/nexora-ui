import { authApi } from "../api/authApi";
import type { ServiceResult } from "./serviceResult";

const errorMessages: Record<string, string> = {
    NEXORA_ERROR_INVALID_CREDENTIALS: "Incorrect email or password",
};

const getErrorMessage = (code: string) => {
    return errorMessages[code] ?? "Login failed. Please try again.";
};

export const login = async (
    email: string,
    password: string,
): Promise<ServiceResult<any>> => {
    const result = await authApi.login(email, password);

    switch (result.type) {
        case "success":
            return {
                type: "success",
                data: result.data,
            };

        case "failure":
            if (
                result.errorCode === "NEXORA_ERROR_UNAUTHORIZED" ||
                result.errorCode === "NEXORA_ERROR_TOKEN_EXPIRED"
            ) {
                return {
                    type: "error",
                    error: { type: "UNAUTHORIZED" },
                };
            }

            return {
                type: "error",
                error: {
                    type: "WITH_MESSAGE",
                    message: getErrorMessage(result.errorCode),
                },
            };
    }
};
