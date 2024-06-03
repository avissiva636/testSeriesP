import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        credentials: 'include'
    }),
    reducerPath: "adminApi",
    tagTypes: ["pQuestionSeries", "pQuestion",  "pAttempt"],
    endpoints: (build) => ({

        getPrelimsSeries: build.query({
            query: ({ userId }) => `/user/prelims/${userId}`
        }),

        getMainsSeries: build.query({
            query: ({ userId }) => `/user/mains/${userId}`
        }),

        getPurchasedSeries: build.query({
            query: ({ userId }) => `/user/purchased/${userId}`,
            providesTags: ["pQuestionSeries"]
        }),

        getPrelimsQuestion: build.query({
            query: ({ qNo }) => `/user/prelims/exam/${qNo}`,
            providesTags: ["pQuestion"]
        }),

        getPrelimAttempt: build.query({
            query: ({ userId, seriesId }) => ({
                url: `/user/prelims/prelimAttempt/${userId}`,
                method: "GET",
                params: { seriesId }
            }),
            providesTags: ["pAttempt"]
        }),

        submitPrelimsQuestion: build.mutation({
            query: ({ qNo, uid, pSeries, pqDesc, selectedOption, }) => ({
                url: `/user/prelims/exam/${qNo}`,
                method: "POST",
                body: {
                    uid,
                    pSeries,
                    pqDesc,
                    pAnswer: selectedOption,
                },
            }),
            invalidatesTags: ["pQuestionSeries", "pQuestion", "pAttempt"]
        }),

        getDiscussionPrelims: build.query({
            query: ({ qNo }) => `/user/discussion/prelims/${qNo}`
        }),       

        getProgressPrelimResults: build.query({
            query: ({ userId }) => `/user/progress/prelims/${userId}`
        }),
        getProgressMainsResults: build.query({
            query: ({ userId }) => `/user/progress/mains/${userId}`
        }),

        getSpecificPrelimProgress: build.query({
            query: ({ questionId }) => `/user/progress/prelimProgress/${questionId}`
        }),

    }),
});

export const {
    useGetPrelimsSeriesQuery,
    useGetMainsSeriesQuery,
    useGetPurchasedSeriesQuery,
    useGetPrelimsQuestionQuery,
    useGetPrelimAttemptQuery,
    useSubmitPrelimsQuestionMutation,
    useGetDiscussionPrelimsQuery,

    useGetProgressPrelimResultsQuery,
    useGetProgressMainsResultsQuery,
    useGetSpecificPrelimProgressQuery,
} = api;