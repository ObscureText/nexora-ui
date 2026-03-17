import axios from "axios";

const BASE_URL = "https://nexora-api-jpif.onrender.com";
// const BASE_URL = "http://localhost:8080";

const baseClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const publicApi = baseClient;

export const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export type ApiResult<T> =
    | { type: "success"; data: T }
    | { type: "failure"; errorCode: string; statusCode: number };
