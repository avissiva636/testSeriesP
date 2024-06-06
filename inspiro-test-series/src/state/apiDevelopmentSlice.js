import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "./stateSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
})

const baseQuesryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {        
        if (result?.error?.data?.message === "User is not authorized" ||
            result?.error?.data?.message === "User UnAuthorized"
        ) {          
            api.dispatch(logOut());
        }
    }

    return result;
}

export const api = createApi({
    baseQuery: baseQuesryWithReauth,
    reducerPath: "adminApi",
    tagTypes: ["pQuestionSeries", "pQuestion", "pAttempt", "mAttempt",
        "archives", "archivesAttempt", "archivesMainAttempt"
    ],
    endpoints: (build) => ({
        login: build.mutation({
            query: (loginData) => ({
                url: `/user/log/login`,
                method: "POST",
                body: { ...loginData }
            }),
        }),

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

        getMainsAttempt: build.query({
            query: ({ userId, seriesId }) => ({
                url: `/user/mains/mainsAttempt/${userId}`,
                method: "GET",
                params: { seriesId }
            }),
            providesTags: ["mAttempt"]
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
            invalidatesTags: ["pQuestionSeries", "pQuestion",
                "pAttempt", "mAttempt",
                "archives", "archivesAttempt", "archivesMainAttempt"
            ]
        }),

        submitMainsQuestion: build.mutation({
            query: ({ formData }) => ({
                url: `/user/mains/exam`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["pQuestionSeries", "pQuestion",
                "pAttempt", "mAttempt",
                "archives", "archivesAttempt", "archivesMainAttempt"
            ]
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

        getArchives: build.query({
            query: ({ userId }) => `/user/archive/${userId}`,
            providesTags: ["archives"]
        }),
        getArchiveAttempt: build.query({
            query: ({ userId }) => `/user/archive/archiveAttempt/${userId}`,
            providesTags: ["archivesAttempt"]
        }),
        getArchiveMainsAttempt: build.query({
            query: ({ userId }) => `/user/archive/archiveMAttempt/${userId}`,
            providesTags: ["archivesMainAttempt"]
        }),

    }),
});

export const {
    useLoginMutation,
    useGetPrelimsSeriesQuery,
    useGetMainsSeriesQuery,
    useGetPurchasedSeriesQuery,
    useGetPrelimsQuestionQuery,
    useGetPrelimAttemptQuery,
    useGetMainsAttemptQuery,
    useSubmitPrelimsQuestionMutation,
    useGetDiscussionPrelimsQuery,

    useGetProgressPrelimResultsQuery,
    useGetProgressMainsResultsQuery,
    useGetSpecificPrelimProgressQuery,

    useGetArchivesQuery,
    useGetArchiveMainsAttemptQuery,
    useGetArchiveAttemptQuery,
    useSubmitMainsQuestionMutation
} = api;