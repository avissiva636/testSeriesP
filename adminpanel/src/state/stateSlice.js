import { createSlice } from '@reduxjs/toolkit'
import { api } from './apiDevelopmentSlice';

const initialState = {
    mode: "dark",
    user: null,
    token: null
};

const authSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            console.log("25 first")
            api.util.invalidateTags(["Batch"]);
            api.util.invalidateTags(["Batch"]);
            
            console.log("27 second")
        }
    }
})

export const { setMode, setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentMode = (state) => state.auth.mode;