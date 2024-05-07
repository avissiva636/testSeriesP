import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
    }),
    reducerPath: "adminApi",
    tagTypes: ["Subject", "Course", "Batch", "Student", "Outline", "Pseries", "Mseries", "psDescSeriesSingle", "psDescSeries"],
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

        getOutline: build.query({
            query: ({ oid }) => ({
                url: `/admin/qpoutline/${oid}`,
                method: "GET"
            })
        }),
        getOutlines: build.query({
            query: () => `/admin/qpoutline`,
            providesTags: ["Outline"]
        }),
        createOutline: build.mutation({
            query: (createOutlineData) => ({
                url: `/admin/qpoutline`,
                method: "POST",
                body: { ...createOutlineData }
            }),
            invalidatesTags: ["Outline"]
        }),
        updateOutline: build.mutation({
            query: ({ outlineId, updateOutlineData }) => ({
                url: `/admin/qpoutline/${outlineId}`,
                method: "PUT",
                body: { ...updateOutlineData }
            }),
            invalidatesTags: ["Outline"]
        }),
        deleteOutline: build.mutation({
            query: (outlineId) => ({
                url: `/admin/qpoutline/${outlineId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Outline"]
        }),

        getPseries: build.query({
            query: ({ psid }) => ({
                url: `/admin/pseries/${psid}`,
                method: "GET"
            })
        }),
        getPSerieses: build.query({
            query: () => `/admin/pseries`,
            providesTags: ["Pseries"]
        }),
        createPSeries: build.mutation({
            query: (createFormData) => ({
                url: `/admin/pseries`,
                method: "POST",
                body: createFormData,
            }),
            invalidatesTags: ["Pseries"]
        }),
        updatePSeries: build.mutation({
            query: ({ psId, updateFormData }) => ({
                url: `/admin/pseries/${psId}`,
                method: "PUT",
                body: updateFormData,
            }),
            invalidatesTags: ["Pseries"]
        }),
        updatePSeriesStatus: build.mutation({
            query: ({ psId, updateFormData }) => ({
                url: `/admin/pseries/psingle/${psId}`,
                method: "PUT",
                body: updateFormData,
            }),
            invalidatesTags: ["Pseries"]
        }),
        deletePSeries: build.mutation({
            query: ({ psId, imgName }) => ({
                url: `/admin/pseries/${psId}`,
                method: "DELETE",
                body: { imgName }
            }),
            invalidatesTags: ["Pseries"]
        }),

        getMseries: build.query({
            query: ({ msid }) => ({
                url: `/admin/mseries/${msid}`,
                method: "GET"
            })
        }),
        getMSerieses: build.query({
            query: () => `/admin/mseries`,
            providesTags: ["Mseries"]
        }),
        createMSeries: build.mutation({
            query: (createFormData) => ({
                url: `/admin/mseries`,
                method: "POST",
                body: createFormData,
            }),
            invalidatesTags: ["Mseries"]
        }),
        updateMSeries: build.mutation({
            query: ({ msId, updateFormData }) => ({
                url: `/admin/mseries/${msId}`,
                method: "PUT",
                body: updateFormData,
            }),
            invalidatesTags: ["Mseries"]
        }),
        deleteMSeries: build.mutation({
            query: ({ msId, imgName }) => ({
                url: `/admin/mseries/${msId}`,
                method: "DELETE",
                body: { imgName }
            }),
            invalidatesTags: ["Mseries"]
        }),

        getPseriesDes: build.query({
            query: ({ pDesId }) => ({
                url: `/admin/pQpDescseries/pSingle/${pDesId}`,
                method: "GET"
            }),
            providesTags: ["psDescSeriesSingle"]
        }),
        getSpecificPdescs: build.query({
            query: ({ pDesId }) => `/admin/pQpDescseries/${pDesId}`,
            providesTags: ["psDescSeries"]
        }),
        createPSeriesDes: build.mutation({
            query: (createFormData) => ({
                url: `/admin/pQpDescseries`,
                method: "POST",
                body: createFormData,
            }),
            invalidatesTags: ["psDescSeries"]
        }),
        updatePSeriesDes: build.mutation({
            query: ({ pDesId, updateFormData }) => ({
                url: `/admin/pQpDescseries/${pDesId}`,
                method: "PUT",
                body: updateFormData,
            }),
            invalidatesTags: ["psDescSeriesSingle"]
        }),
        updatePSeriesDesStatus: build.mutation({
            query: ({ pDesId, updateFormData }) => ({
                url: `/admin/pQpDescseries/pSingle/${pDesId}`,
                method: "PUT",
                body: updateFormData,
            }),
            invalidatesTags: ["psDescSeries"]
        }),
        deletePSeriesDesStatus: build.mutation({
            query: ({ pDesId, imgName }) => ({
                url: `/admin/pQpDescseries/pSingle/${pDesId}`,
                method: "DELETE",
                body: { imgName },
            }),
            invalidatesTags: ["psDescSeries"]
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
    useDeleteStudentMutation,

    useGetOutlineQuery,
    useGetOutlinesQuery,
    useCreateOutlineMutation,
    useUpdateOutlineMutation,
    useDeleteOutlineMutation,

    useGetPseriesQuery,
    useGetPSeriesesQuery,
    useCreatePSeriesMutation,
    useUpdatePSeriesMutation,
    useUpdatePSeriesStatusMutation,
    useDeletePSeriesMutation,

    useGetMseriesQuery,
    useGetMSeriesesQuery,
    useCreateMSeriesMutation,
    useUpdateMSeriesMutation,
    useDeleteMSeriesMutation,

    useGetPseriesDesQuery,
    useGetSpecificPdescsQuery,
    useCreatePSeriesDesMutation,
    useUpdatePSeriesDesMutation,
    useUpdatePSeriesDesStatusMutation,
    useDeletePSeriesDesStatusMutation,
} = api;