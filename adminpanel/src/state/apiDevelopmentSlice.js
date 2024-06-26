import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./stateSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
        const refreshResult = await baseQuery({
            url: '/admin/log/refresh',
            method: 'POST'
        }, api, extraOptions);
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

export const api = createApi({
    baseQuery: baseQuesryWithReauth,
    reducerPath: "adminApi",
    tagTypes: ["Subject", "Course", "Batch", "Student", "Outline",
        "Pseries", "Mseries",
        "Psales",
        "psDescSeriesSingle", "psDescSeries", "psInvidualQuestion", "psDescResult",
        "msDescSeriesSingle", "msDescSeries",
        "Msales", "profile"],
    endpoints: (build) => ({
        login: build.mutation({
            query: credentials => ({
                url: '/admin/log/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refresh: build.mutation({
            query: credentials => ({
                url: '/admin/log/refresh',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        getDashboard: build.query({
            query: () => `/admin/setting/dashboard`,
            providesTags: ["Dashboard"]
        }),
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
        getAllStudents: build.query({
            query: () => ({
                url: `/admin/student/uncondition`,
                method: "GET",
            }),
            providesTags: ["Student"]
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
        updateMSeriesStatus: build.mutation({
            query: ({ msId, updateFormData }) => ({
                url: `/admin/mseries/msingle/${msId}`,
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
        getPseriesResult: build.query({
            query: ({ pQDesId, page, pageSize, sort, search }) => ({
                url: `/admin/pQpDescseries/pResult/${pQDesId}`,
                method: "GET",
                params: { pQDesId, page, pageSize, sort, search },
            }),
            providesTags: ["psDescResult"]
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

        getSpecificPsQuestion: build.query({
            query: ({ pQuesId }) => `/admin/psQuestions/${pQuesId}`,
            providesTags: ["psInvidualQuestion"]
        }),
        createPsQuestion: build.mutation({
            query: (createQuestions) => ({
                url: `/admin/psQuestions`,
                method: "POST",
                body: createQuestions,
            }),
            invalidatesTags: ["psInvidualQuestion"]
        }),
        updatePsQuestion: build.mutation({
            query: ({ psQuestionId, createQuestions }) => ({
                url: `/admin/psQuestions/${psQuestionId}`,
                method: "PUT",
                body: createQuestions,
            }),
            invalidatesTags: ["psInvidualQuestion"]
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

        getMseriesDes: build.query({
            query: ({ mDesId }) => ({
                url: `/admin/mQpDescseries/mSingle/${mDesId}`,
                method: "GET"
            }),
            providesTags: ["msDescSeriesSingle"]
        }),
        getMseriesResult: build.query({
            query: ({ mQDesId, page, pageSize, sort, search }) => ({
                url: `/admin/mQpDescseries/mResult/${mQDesId}`,
                method: "GET",
                params: { mQDesId, page, pageSize, sort, search },
            }),
            providesTags: ["psDescResult"]
        }),
        updateMainCorrect: build.mutation({
            query: ({ userId, formData }) => ({
                url: `/admin/mQpDescseries/mSubmit/${userId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["msDescSeriesSingle"]
        }),
        deleteMainCorrect: build.mutation({
            query: ({ userId, questionDescId }) => ({
                url: `/admin/mQpDescseries/mSubmit/${userId}`,
                method: "DELETE",
                body: {questionDescId},
            }),
            invalidatesTags: ["msDescSeriesSingle"]
        }),
        getSpecificMdescs: build.query({
            query: ({ mDesId }) => `/admin/mQpDescseries/${mDesId}`,
            providesTags: ["msDescSeries"]
        }),
        createMSeriesDes: build.mutation({
            query: (createFormData) => ({
                url: `/admin/mQpDescseries`,
                method: "POST",
                body: createFormData,
            }),
            invalidatesTags: ["msDescSeries"]
        }),
        updateMSeriesDes: build.mutation({
            query: ({ mDesId, updateFormData }) => ({
                url: `/admin/mQpDescseries/${mDesId}`,
                method: "PUT",
                body: updateFormData,
            }),
            invalidatesTags: ["msDescSeriesSingle"]
        }),
        updateMSeriesDesStatus: build.mutation({
            query: ({ mDesId, status }) => ({
                url: `/admin/mQpDescseries/mSingle/${mDesId}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["msDescSeries"]
        }),
        deleteMSeriesDesStatus: build.mutation({
            query: ({ mDesId, imgName }) => ({
                url: `/admin/mQpDescseries/mSingle/${mDesId}`,
                method: "DELETE",
                body: { imgName },
            }),
            invalidatesTags: ["msDescSeries"]
        }),

        getMainsSales: build.query({
            query: () => `/admin/mSales`,
            providesTags: ["Msales"]
        }),
        getcondtionalMainsSales: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `/admin/mSales/conditional`,
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Msales"]
        }),
        createMainsSales: build.mutation({
            query: (createMainsData) => ({
                url: `/admin/mSales`,
                method: "POST",
                body: createMainsData,
            }),
            invalidatesTags: ["Msales"]
        }),
        updateMainsSales: build.mutation({
            query: ({ msId, updateMainsData }) => ({
                url: `/admin/mSales/${msId}`,
                method: "PUT",
                body: updateMainsData,
            }),
            invalidatesTags: ["Msales"]
        }),
        deleteMainsSales: build.mutation({
            query: ({ msId }) => ({
                url: `/admin/mSales/${msId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Msales"]
        }),


        getProfile: build.query({
            query: () => `/admin/setting/profile`,
            providesTags: ["profile"]
        }),
        createProfile: build.mutation({
            query: (createProfileData) => ({
                url: `/admin/setting/profile`,
                method: "POST",
                body: { ...createProfileData },
            }),
            invalidatesTags: ["profile"]
        }),
        updateProfile: build.mutation({
            query: (createProfileData) => ({
                url: `/admin/setting/profile`,
                method: "PUT",
                body: { ...createProfileData },
            }),
            invalidatesTags: ["profile"]
        }),
        deleteProfile: build.mutation({
            query: ({ pId }) => ({
                url: `/admin/setting/profile`,
                method: "DELETE",
                body: { pid: pId }
            }),
            invalidatesTags: ["profile"]
        }),
    }),
});

export const {
    useLoginMutation,
    useRefreshMutation,
    useGetDashboardQuery,

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
    useGetAllStudentsQuery,
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
    useUpdateMSeriesStatusMutation,
    useDeleteMSeriesMutation,

    useGetPseriesDesQuery,
    useGetSpecificPdescsQuery,
    useGetPseriesResultQuery,
    useCreatePSeriesDesMutation,
    useUpdatePSeriesDesMutation,
    useUpdatePSeriesDesStatusMutation,
    useDeletePSeriesDesStatusMutation,

    useGetSpecificPsQuestionQuery,
    useCreatePsQuestionMutation,
    useUpdatePsQuestionMutation,

    useGetPrelimSalesQuery,
    useGetcondtionalPrelimSalesQuery,
    useGetMseriesResultQuery,
    useUpdateMainCorrectMutation,
    useDeleteMainCorrectMutation,
    useCreatePrelimSalesMutation,
    useUpdatePrelimSalesMutation,
    useDeletePrelimSalesMutation,

    useGetSpecificMdescsQuery,
    useGetMseriesDesQuery,
    useCreateMSeriesDesMutation,
    useUpdateMSeriesDesMutation,
    useUpdateMSeriesDesStatusMutation,
    useDeleteMSeriesDesStatusMutation,

    useGetMainsSalesQuery,
    useGetcondtionalMainsSalesQuery,
    useCreateMainsSalesMutation,
    useUpdateMainsSalesMutation,
    useDeleteMainsSalesMutation,

    useGetProfileQuery,
    useCreateProfileMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
} = api;