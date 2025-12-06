import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!user) {
        return (
            <Navigate
                to="/auth/login"
                state={{ from: location }}
                replace
            />
        );
    }
    const isAdmin =
        user?.role === "admin" ||
        user?.email === "admin@example.com";

    if (!isAdmin) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default AdminRoute;
