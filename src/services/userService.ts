import type { ApiResult } from "../api/apiClient";
import { userApi, type UserProfileResponse } from "../api/userApi";
import type { ServiceResult } from "./serviceResult";

const errorMessages: Record<string, string> = {
    USER_NOT_FOUND: "User not found",
    INVALID_TOKEN: "Session is invalid. Please login again.",
    TOKEN_EXPIRED: "Session expired. Please login again.",
    ACCESS_DENIED: "You do not have permission to perform this action",
};

const getErrorMessage = (code: string) => {
    return errorMessages[code] ?? "Something went wrong. Please try again.";
};

const mapApiResult = (result: ApiResult<any>): ServiceResult<any> => {
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

export const getIndividualProfile = async (): Promise<
    ServiceResult<UserProfileResponse>
> => {
    const result = await userApi.getIndividualProfile();
    return mapApiResult(result);
};

export const getEstablishmentProfile = async (): Promise<
    ServiceResult<UserProfileResponse>
> => {
    const result = await userApi.getEstablishmentProfile();
    return mapApiResult(result);
};

export const getAdminProfile = async (): Promise<
    ServiceResult<UserProfileResponse>
> => {
    const result = await userApi.getAdminProfile();
    return mapApiResult(result);
};
