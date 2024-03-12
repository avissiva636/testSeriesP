import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddPrelimsSeries from "scenes/prelims/AddPrelimsSeries";
import ListPrelimsSeries from "scenes/prelims/ListPrelimsSeries";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { selectCurrentMode } from "state/stateSlice";
import { themeSettings } from "theme";
import AddSubjects from "scenes/subjects/AddSubjects";
import EditSubjects from "scenes/subjects/EditSubjectsSub";
import AddCourses from "scenes/courses/AddCourses";
import EditCourses from "scenes/courses/EditCoursesSub";
import ListSubjects from "scenes/subjects/ListSubjects";
import ListCourses from "scenes/courses/ListCourses";
import AddBatches from "scenes/batches/AddBatches";
import EditBatch from "scenes/batches/EditBatchsSub";
import ListBatches from "scenes/batches/ListBatches";
import AddMainsSeries from "scenes/mains/AddMainsSeries";
import ListMainsSeries from "scenes/mains/ListMainsSeries";
import AddScheduledSeries from "scenes/scheduled/AddScheduledSeries";
import ListScheduledSeries from "scenes/scheduled/ListScheduledSeries";

function App() {
  const mode = useSelector(selectCurrentMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Dashboard />} />
            <Route path="addprelimsseries" element={<AddPrelimsSeries />} />
            <Route path="listprelimsseries" element={<ListPrelimsSeries />} />

            <Route path="addmainsseries" element={<AddMainsSeries />} />
            <Route path="listmainsseries" element={<ListMainsSeries />} />

            <Route path="addscheduledseries" element={<AddScheduledSeries />} />
            <Route path="listscheduledseries" element={<ListScheduledSeries />} />

            <Route path="addsubjects" element={<AddSubjects />} />
            <Route path="editsubjects/:id" element={<EditSubjects />} />
            <Route path="listsubjects" element={<ListSubjects />} />

            <Route path="addcourses" element={<AddCourses />} />
            <Route path="editcourses/:id" element={<EditCourses />} />
            <Route path="listcourses" element={<ListCourses />} />

            <Route path="addbatches" element={<AddBatches />} />
            <Route path="editbatch/:id" element={<EditBatch />} />
            <Route path="listbatches" element={<ListBatches />} />
            {/* public routes */}
            {/* <Route index element={<Public />} />
            <Route path="login" element={<Login />} /> */}

            {/* protected routes */}
            {/* <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route> */}

          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App;