import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddPrelimsSeries from "scenes/addprelimsseries";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { selectCurrentMode } from "state/stateSlice";
import { themeSettings } from "theme";
import AddSubjects from "scenes/subjects/AddSubjects";
import AddCourses from "scenes/courses/AddCourses";
import ListSubjects from "scenes/subjects/ListSubjects";
import ListCourses from "scenes/courses/ListCourses";

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

            <Route path="addsubjects" element={<AddSubjects />} />
            <Route path="listsubjects" element={<ListSubjects />} />

            <Route path="addcourses" element={<AddCourses />} />
            <Route path="listcourses" element={<ListCourses />} />
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