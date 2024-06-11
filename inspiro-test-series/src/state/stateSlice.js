import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: localStorage.getItem('user') || null,
    userId: localStorage.getItem('userId') || null,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, userid } = action.payload;
            state.user = user;
            state.userId = userid;
            localStorage.setItem('user', user);
            localStorage.setItem('userId', userid);
        },
        logOut: (state, action) => {
            state.user = null;
            state.userId = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            // window.location.reload();
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentUserId = (state) => state.auth.userId;