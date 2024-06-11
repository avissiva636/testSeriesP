import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiDevelopmentSlice"
import authReducer from "./stateSlice"

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: true
})
