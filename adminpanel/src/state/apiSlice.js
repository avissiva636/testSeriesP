import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from './stateSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQuesryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log("sending Refresh Token");
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            // setting new action token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            //retury with new access token

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQuesryWithReauth,
    endpoints: builder => ({})
})