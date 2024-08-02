import {Navigate, useLocation, Outlet} from "react-router-dom";
import {useAuth} from "./AuthContext";

export const ProtectedRoute = ({children, roles, redirectPath, requireLogin}) => {
    const {user} = useAuth();
    console.log(user)

    if ((requireLogin && !user) || (!requireLogin && user)) {
        return <Navigate to={redirectPath} />;
    }

    if (roles && !haveRole(user.user.roles, roles)) {
        return <Navigate to={redirectPath} />;
    }
    return children ? children : <Outlet/>;
};

function haveRole(userRoles, roles) {
    return userRoles.some(userRole => roles.includes(userRole.name));
}