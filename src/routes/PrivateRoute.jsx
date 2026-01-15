import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("access-token");

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (user?.email && !token) {
    return (
      <div className="text-center py-10">
        <p>Preparing your session...</p>
        <p className="text-xs text-gray-500 mt-2">
          Server may take a few seconds to wake up.
        </p>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <Navigate to="/auth/login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default PrivateRoute;
