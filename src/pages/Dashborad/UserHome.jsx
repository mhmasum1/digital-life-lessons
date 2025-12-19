import { Navigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Spinner from "../../components/common/Spinner";

const UserHome = () => {
    const { isAdmin, adminLoading } = useAdmin();

    if (adminLoading) return <Spinner />;

    if (isAdmin) {
        return <Navigate to="/dashboard/admin" replace />;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-1">Welcome to your Dashboard</h1>
            <p className="text-sm text-gray-600">
                Here you can add lessons, manage your lessons and see your favorites.
            </p>
        </div>
    );
};

export default UserHome;
