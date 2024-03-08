import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { api } from "./apiDevelopmentSlice"
import authReducer from "./features/auth/authSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        // getDefaultMiddleware().concat(apiSlice.middleware),
        getDefaultMiddleware().concat(api.middleware),
    devTools: true
})
