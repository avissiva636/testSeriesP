import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    reducerPath: "adminApi",
    tagTypes: ["Subject", "Course", "Batch"],
    endpoints: (build) => ({
        getCourses: build.query({
            query: () => `/admin/course`,
            providesTags: ["Course"]
        }),
        createCourse: build.mutation({
            query: (createCourseData) => ({
                url: `/admin/course`,
                method: "POST",
                body: { ...createCourseData }
            }),
            invalidatesTags: ["Course"]
        }),
        updateCourse: build.mutation({
            query: ({ courseId, updateCourseData }) => ({
                url: `/admin/Course/${courseId}`,
                method: "PUT",
                body: { ...updateCourseData }
            }),
            invalidatesTags: ["Course"]
        }),
        deleteCourse: build.mutation({
            query: (courseId) => ({
                url: `/admin/Course/${courseId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Course"]
        }),

        getSubjects: build.query({
            query: () => `/admin/subject`,
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

        getBatches: build.query({
            query: () => `/admin/batch`,
            providesTags: ["Batch"]
        }),
        createBatch: build.mutation({
            query: (createBatchData) => ({
                url: `/admin/batch`,
                method: "POST",
                body: { ...createBatchData }
            }),
            invalidatesTags: ["Batch"]
        }),
        updateBatch: build.mutation({
            query: ({ batchId, updateBatchData }) => ({
                url: `/admin/batch/${batchId}`,
                method: "PUT",
                body: { ...updateBatchData }
            }),
            invalidatesTags: ["Batch"]
        }),
        deleteBatch: build.mutation({
            query: (batchId) => ({
                url: `/admin/batch/${batchId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Batch"]
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,

    useGetSubjectsQuery,
    useCreateSubjectMutation,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,

    useGetBatchesQuery,
    useCreateBatchMutation,
    useUpdateBatchMutation,
    useDeleteBatchMutation
} = api;