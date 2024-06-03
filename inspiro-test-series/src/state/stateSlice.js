import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    userId: "66279432cc5ed3267265fd5d",
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            window.location.reload();
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.token;