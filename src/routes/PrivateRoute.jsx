import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // loading state
    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    // if user NOT logged in → go to login
    if (!user?.email) {
        return (
            <Navigate
                to="/auth/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // user logged in → allow
    return children;
};

export default PrivateRoute;
