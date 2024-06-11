import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUserId, setCredentials } from "../../state/stateSlice";
import { useEffect } from "react";

const Layout = () => {
  let userId = useSelector(selectCurrentUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId && userId !== "null") {
      userId = localStorage.getItem("user");
      const userName = localStorage.getItem("user");
      dispatch(setCredentials({ user: userName, userid: userId }));
    }
  }, [userId]);

  return userId !== null && userId !== "null" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Layout;
