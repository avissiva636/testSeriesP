import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    reducerPath: "adminApi",
    tagTypes: ["Subject", "Course", "Batch", "Student"],
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

        getStudent: build.query({
            query: ({ sid }) => ({
                url: `/admin/student/${sid}`,
                method: "GET"
            })
        }),
        getStudents: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `/admin/student`,
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Student"]
        }),
        createStudent: build.mutation({
            query: (createStudentData) => ({
                url: `/admin/student`,
                method: "POST",
                body: { ...createStudentData }
            }),
            invalidatesTags: ["Student"]
        }),
        updateStudent: build.mutation({
            query: ({ studentId, updateStudentData }) => ({
                url: `/admin/student/${studentId}`,
                method: "PUT",
                body: { ...updateStudentData }
            }),
            invalidatesTags: ["Student"]
        }),
        deleteStudent: build.mutation({
            query: (studentId) => ({
                url: `/admin/student/${studentId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Student"]
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
    useDeleteBatchMutation,

    useGetStudentQuery,
    useGetStudentsQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation
} = api;