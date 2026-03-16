export type ServiceResult<T> =
    | { type: "success"; data: T }
    | { type: "error"; error: ServiceError };

export type ServiceError =
    | { type: "UNAUTHORIZED" }
    | { type: "WITH_MESSAGE"; message: string };
