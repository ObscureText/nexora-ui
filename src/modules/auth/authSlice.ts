import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    serviceProvider: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    serviceProvider: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },

        setUser(state, action) {
            state.user = action.payload.user;
            state.serviceProvider = action.payload.serviceProvider;
            state.error = null;
        },

        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        clearAuth(state) {
            state.user = null;
            state.serviceProvider = null;
        },
    },
});

export const { setLoading, setUser, setError, clearAuth } = authSlice.actions;

export default authSlice.reducer;
