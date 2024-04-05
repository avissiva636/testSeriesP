import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    reducerPath: "adminApi",
    tagTypes: ["Subject"],
    endpoints: (build) => ({
        getSubjects: build.query({
            query: (id) => `/admin/subject`,
            providesTags: ["Subject"]
        }),

        createSubject: build.mutation({
            query: (createSubjectData) => ({
                url: `/admin/subject`,
                method: "POST",
                body: { ...createSubjectData }
            }),
            invalidatesTags: ["Subject"]
        }),
        updateSubject: build.mutation({
            query: ({ subjectId, updateSubjectData }) => ({
                url: `/admin/subject/${subjectId}`,
                method: "PUT",
                body: { ...updateSubjectData }
            }),
            invalidatesTags: ["Subject"]
        }),
        deleteSubject: build.mutation({
            query: (subjectId) => ({
                url: `/admin/subject/${subjectId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Subject"]
        }),
    }),
});

export const {
    useGetSubjectsQuery,
    useCreateSubjectMutation,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,
} = api;