import React from 'react'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser } from 'state/stateSlice';

const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser)    
    const locaion = useLocation();
    const isNonMobile = useOutletContext();    

    const decoded = token ? jwtDecode(token) : undefined;    
    const roles = decoded?.UserInfo?.roles || [];    

    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet
                context={isNonMobile}
            />
            : user
                ? <Navigate to={"/restrict"} state={{ from: locaion }} replace />
                : <Navigate to='/login' state={{ from: locaion }} replace />
    );
}

export default RequireAuth