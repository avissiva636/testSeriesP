import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        credentials: 'include'
    }),
    reducerPath: "adminApi",
    tagTypes: ["Psales"],
    endpoints: (build) => ({

        getPrelimsSeries: build.query({
            query: ({ userId }) => `/user/prelims/${userId}`
        }),

        getMainsSeries: build.query({
            query: ({ userId }) => `/user/mains/${userId}`
        }),

        getPurchasedSeries: build.query({
            query: ({ userId }) => `/user/purchased/${userId}`
        }),

        getPrelimsQuestion: build.query({
            query: ({ qNo }) => `/user/prelims/exam/${qNo}`
        }),

        getDiscussionPrelims: build.query({
            query: ({ qNo }) => `/user/discussion/prelims/${qNo}`
        }),

        getPrelimSales: build.query({
            query: () => `/admin/psales`,
            providesTags: ["Psales"]
        }),
        getcondtionalPrelimSales: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `/admin/psales/conditional`,
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Psales"]
        }),
        createPrelimSales: build.mutation({
            query: (createPrelimData) => ({
                url: `/admin/psales`,
                method: "POST",
                body: createPrelimData,
            }),
            invalidatesTags: ["Psales"]
        }),
        updatePrelimSales: build.mutation({
            query: ({ psId, updatePrelimData }) => ({
                url: `/admin/psales/${psId}`,
                method: "PUT",
                body: updatePrelimData,
            }),
            invalidatesTags: ["Psales"]
        }),
        deletePrelimSales: build.mutation({
            query: ({ psId }) => ({
                url: `/admin/psales/${psId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Psales"]
        }),

        getProgressPrelimResults: build.query({
            query: ({ userId }) => `/user/progress/prelims/${userId}`
        }),
        getProgressMainsResults: build.query({
            query: ({ userId }) => `/user/progress/mains/${userId}`
        }),


    }),
});

export const {
    useGetPrelimsSeriesQuery,
    useGetMainsSeriesQuery,
    useGetPurchasedSeriesQuery,
    useGetPrelimsQuestionQuery,
    useGetDiscussionPrelimsQuery,

    useGetPrelimSalesQuery,
    useGetcondtionalPrelimSalesQuery,
    useCreatePrelimSalesMutation,
    useUpdatePrelimSalesMutation,
    useDeletePrelimSalesMutation,

    useGetProgressPrelimResultsQuery,
    useGetProgressMainsResultsQuery,

} = api;