import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { selectCurrentMode } from "state/stateSlice";
import { themeSettings } from "theme";
import AddPrelimsSeries from "scenes/prelims/AddPrelimsSeries";
import EditPrelimsSeries from "scenes/prelims/EditPrelimsSeries";
import ListPrelimsSeries from "scenes/prelims/ListPrelimsSeries";
import SellPrelimsSeries from "scenes/prelims/SellPrelimsSeries";
import SalesPrelimsSeries from "scenes/prelims/SalesPrelimsSeries";
import AddMainsSeries from "scenes/mains/AddMainsSeries";
import EditMainsSeries from "scenes/mains/EditMainsSeries";
import ListMainsSeries from "scenes/mains/ListMainsSeries";
import SellMainsSeries from "scenes/mains/SellMainsSeries";
import SalesMainsSeries from "scenes/mains/SalesMainsSeries";
import AddScheduledSeries from "scenes/scheduled/AddScheduledSeries";
import EditScheduledSeries from "scenes/scheduled/EditScheduledSeries";
import ListScheduledSeries from "scenes/scheduled/ListScheduledSeries";
import EnrollScheduledSeries from "scenes/scheduled/EnrollScheduledSeries";
import AddQPOutline from "scenes/qpoutline/AddQPOutline";
import EditQpOutline from "scenes/qpoutline/EditQpOutline";
import ListQpOutline from "scenes/qpoutline/ListQpOutline";
import AddSubjects from "scenes/subjects/AddSubjects";
import EditSubjects from "scenes/subjects/EditSubjectsSub";
import ListSubjects from "scenes/subjects/ListSubjects";
import AddCourses from "scenes/courses/AddCourses";
import EditCourses from "scenes/courses/EditCoursesSub";
import ListCourses from "scenes/courses/ListCourses";
import AddBatches from "scenes/batches/AddBatches";
import EditBatch from "scenes/batches/EditBatchsSub";
import ListBatches from "scenes/batches/ListBatches";
import AddStudents from "scenes/students/AddStudents";
import EditStudents from "scenes/students/EditStudents";
import ListStudents from "scenes/students/ListStudents";
import AddMainsQpDes from "scenes/mains/AddMainsQpDes";
import AddPrelimsQpDes from "scenes/prelims/AddPrelimsQpDes";
import ListPrelimsQpDes from "scenes/prelims/ListPrelimsQpDes";
import EditPrelimsQpDes from "scenes/prelims/EditPrelimsQpDes";
import AddPrelimsQuestions from "scenes/prelims/AddPrelimsQuestions";
import ListMainsQpDes from "scenes/mains/ListMainsQpDes";
import EditMainsQpDes from "scenes/mains/EditMainsQpDes";
import Restrict from "scenes/restrict";
import Profile from "scenes/profile";
import Login from "scenes/login/Login";
import RequireAuth from "components/auth/RequireAuth";
import PersistLogin from "components/auth/PersistLogin";
import PrelimResult from "scenes/prelims/PrelimResult";
import MainsResult from "scenes/mains/MainsResult";
import AddMainsCorrection from "scenes/mains/AddMainsCorrection";

function App() {
  const mode = useSelector(selectCurrentMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route path="restrict" element={<Restrict />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[5150]} />}>
                <Route path="profile" element={<Profile />} />

                <Route path="sellprelimsseries" element={<SellPrelimsSeries />} />
                <Route path="salesprelimsseries" element={<SalesPrelimsSeries />} />

                <Route path="sellmainsseries" element={<SellMainsSeries />} />
                <Route path="salesmainsseries" element={<SalesMainsSeries />} />

                <Route path="addstudents" element={<AddStudents />} />
                <Route path="editstudents/:id" element={<EditStudents />} />
                <Route path="liststudents" element={<ListStudents />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[1984]} />}>
                <Route path="home" element={<Dashboard />} />

                <Route path="addprelimsseries" element={<AddPrelimsSeries />} />
                <Route path="editprelimsseries/:id" element={<EditPrelimsSeries />} />
                <Route path="listprelimsseries" element={<ListPrelimsSeries />} />
                <Route path="prelimresult" element={<PrelimResult />} />
                <Route path="add_prelims_qp_description" element={<AddPrelimsQpDes />} />
                <Route path="edit_prelims_qp_description" element={<EditPrelimsQpDes />} />
                <Route path="list_prelims_qp_description" element={<ListPrelimsQpDes />} />
                <Route path="add_prelims_question" element={<AddPrelimsQuestions />} />


                <Route path="addmainsseries" element={<AddMainsSeries />} />
                <Route path="editmainsseries/:id" element={<EditMainsSeries />} />
                <Route path="listmainsseries" element={<ListMainsSeries />} />
                <Route path="mainresult" element={<MainsResult />} />
                <Route path="maincorrection" element={<AddMainsCorrection />} />
                <Route path="add_mains_qp_description" element={<AddMainsQpDes />} />
                <Route path="edit_mains_qp_description" element={<EditMainsQpDes />} />
                <Route path="list_mains_qp_description" element={<ListMainsQpDes />} />

                <Route path="addscheduledseries" element={<AddScheduledSeries />} />
                <Route path="editscheduledseries/:id" element={<EditScheduledSeries />} />
                <Route path="listscheduledseries" element={<ListScheduledSeries />} />
                <Route path="enrolledscheduledseries" element={<EnrollScheduledSeries />} />

                <Route path="addoutline" element={<AddQPOutline />} />
                <Route path="editoutline/:id" element={<EditQpOutline />} />
                <Route path="listoutline" element={<ListQpOutline />} />

                <Route path="addsubjects" element={<AddSubjects />} />
                <Route path="editsubjects/:id" element={<EditSubjects />} />
                <Route path="listsubjects" element={<ListSubjects />} />

                <Route path="addcourses" element={<AddCourses />} />
                <Route path="editcourses/:id" element={<EditCourses />} />
                <Route path="listcourses" element={<ListCourses />} />

                <Route path="addbatches" element={<AddBatches />} />
                <Route path="editbatch/:id" element={<EditBatch />} />
                <Route path="listbatches" element={<ListBatches />} />



              </Route>
            </Route>
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App;